import { NextResponse } from 'next/server';
import os from 'os';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-core';
import getExecutablePath from '@/libs/getExcutablePath';

export async function GET() {
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: getExecutablePath(os.platform()),
    });
    const page = await browser.newPage();
    await page.goto('https://www.cnnvd.org.cn/home/warn');
    await page.click('div.el-input');
    await page.click('div.el-select-dropdown li:nth-child(4) span');
    const html = await page.content();
    const $ = cheerio.load(html);
    const titles = $('.content-title')
      .map((_, element) => {
        return $(element).text();
      })
      .get();

    const dates = $('div.content-detail span')
      .map((_, element) => {
        return $(element).text();
      })
      .get();
    const data = [];
    for (let i = 0; i < titles.length; i += 1) {
      const item = {
        id: i,
        title: titles[i],
        date: dates[i],
      };
      data.push(item);
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
