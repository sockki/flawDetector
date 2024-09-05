/* eslint-disable */

import { NextResponse } from 'next/server';
import os from 'os';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-core';
import getExecutablePath from '@/libs/getExcutablePath';
//import { addDoc, collection } from 'firebase/firestore';
//import { db } from '@/firebase/firebaseConfig';

export type CrawlingData = {
  title: string;
  company:string;
  uploadDate:Date;
  content: Content[];
  views:number
};

type Content = string | Table;

type Table = {
  table?: TableObject[];
};

export type TableObject = {
  column1?: string;
  column2?: string;
  column3?: string;
  column4?: string;
  column5?: string;
  column6?: string;
};

function parseDetailContent($: cheerio.CheerioAPI): Content[] {
  const content: Content[] = [];
  $('.detail-content')
    .children()
    .each((_, element) => {
      if ($(element).is('p')) {
        const textContent = $(element).text().trim();
        content.push(textContent);
      } else if ($(element).is('table')) {
        const rows = $(element).find('tr');

        const tableData: TableObject[] = [];

        rows.each((__, row) => {
          const rowData: TableObject = {};
          $(row)
            .find('td, th')
            .each((index, cell) => {
              const cellContent = $(cell).text().trim();
              const columnKey = `column${index + 1}` as keyof TableObject;
              rowData[columnKey] = cellContent;
            });
          tableData.push(rowData);
        });
        content.push({ table: tableData });
      }
    });

  return content;
}

export async function GET() {
  let browser;
  const dummyDate = new Date("2024-06-11 06:00:00")
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: getExecutablePath(os.platform()),
    });

    const page = await browser.newPage();
    await page.goto('https://www.cnnvd.org.cn/home/warn', {
      waitUntil: 'networkidle2',
    });

    const data: CrawlingData[] = [];

    for (let i = 0; i < 5; i += 1) {
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

        const title = $('.detail-title').text();
        const [company, date] = $('div.detail-subtitle > span').text().split("：");
        const content = parseDetailContent($);
        const uploadDate = new Date(date)
        if(dummyDate.getTime() < uploadDate.getTime()) {
          data.push({
            title,
            company,
            uploadDate,
            content,
            views: 0
          })
        } else {
          return NextResponse.json(data);
        }
        
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

    return NextResponse.json(data);
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
