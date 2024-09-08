/* eslint-disable */

import { NextResponse } from 'next/server';
import os from 'os';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-core';
import getExecutablePath from '@/libs/getExcutablePath';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { Content, TableObject } from '@/types/crawlingData';


async function getTranslation(crawlingData: TableObject | string) {
  const promptMessage = `${typeof crawlingData === 'string' ? crawlingData : JSON.stringify(crawlingData)} \n 위의 글을 그대로 한글로 번역 해줘. 번역해 드리겠습니다 같은 다른 말 붙이지 말고 글만 번역해줘`;

  try {
    const response = await fetch('http://localhost:3000/api/generateMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: promptMessage,
      }),
    });

    if (!response.ok) {
      throw new Error('응답 생성 실패');
    }
    const data = await response.json();

    return NextResponse.json(data.message);
  } catch (error) {
    throw new Error('응답 생성 실패');
  }
}

async function parseDetailContent($: cheerio.CheerioAPI): Promise<Content[]> {
  const content: Content[] = [];

  /* $('.detail-content')
    .children()
    .each(async (_, element) => {
      
    });
 */

  // .detail-content 내의 요소들에 대해 처리
  const elements = $('.detail-content').children().toArray();

  for (const element of elements) {
    {
      if ($(element).is('p')) {
        const textContent = $(element).text().trim();
        const translateText = await getTranslation(textContent);
        const jsonText = await translateText.json();

        content.push(jsonText);
      } else if ($(element).is('table')) {
        const rows = $(element).find('tr').toArray();

        const tableData: TableObject[] = [];

        for (const row of rows) {
          const rowData: TableObject = {};
          $(row)
            .find('td, th')
            .each((index, cell) => {
              const cellContent = $(cell).text().trim();
              const columnKey = `column${index + 1}` as keyof TableObject;
              rowData[columnKey] = cellContent;
            });
          tableData.push(rowData);
        }
        content.push({ table: tableData });
      }
    }
  }
  return content;
}

export async function GET() {
  let browser;
  const nowDate = Date.now();
  const dummyDate = new Date('2024-04-12 16:00:00');
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: getExecutablePath(os.platform()),
    });

    const page = await browser.newPage();
    await page.goto('https://www.cnnvd.org.cn/home/warn', {
      waitUntil: 'networkidle2',
    });

    //const data = [];

    for (let i = 0; i < 10; i += 1) {
      for (let j = 0; j < 10; j += 1) {
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
        await page.waitForSelector(
          `#loudong > form > div.content > div > div.el-col.el-col-16 > div:nth-child(${j + 1})`,
        );
        await page.click(
          `#loudong > form > div.content > div > div.el-col.el-col-16 > div:nth-child(${j + 1})`,
        );
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
        const html = await page.content();
        const $ = cheerio.load(html);
        const [_, date] = $('div.detail-subtitle > span').text().split('：');
        const uploadDate = new Date(date);

        if (uploadDate.getTime() <= dummyDate.getTime()) {
          const title = $('.detail-title').text().slice(6);
          const keyword = $('.detail-title').text().slice(1, 5);
          const translateTitle = await (await getTranslation(title)).json();
          const translateKeyword = await (await getTranslation(keyword)).json();
          const content = await parseDetailContent($);

          await addDoc(collection(db, 'vulDb'), {
            title: translateTitle,
            keyword: translateKeyword,
            uploadDate,
            scrapDate: nowDate,
            content,
            view: 0,
          });
        }

        /* if (dummyDate.getTime() < uploadDate.getTime()) {
          data.push({
            title:translateTitle,
            keyword:translateKeyword,
            uploadDate,
            content,
            view: 0,
          });
        } else {
          return NextResponse.json(data);
        } */

        /* await addDoc(collection(db, 'vulDb'), {
          title,
          subTitle,
          content,
          views: 0
        }); */
        await page.waitForSelector('.el-page-header__left');
        await page.click(`.el-page-header__left`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      await page.waitForSelector(`button.btn-next`);
      await page.click(`button.btn-next`);
    }

    return NextResponse.json({ message: 'done', status: true });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ message: error.message, status: false });
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
