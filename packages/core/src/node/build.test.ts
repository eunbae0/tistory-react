import { join } from 'node:path';
import { expect, describe, test } from 'vitest';
import fs from '@tistory-react/shared/fs-extra';

import { bundleXml } from './build';
import { normalizePath } from './utils';
import { OUTPUT_DIR } from './constants';
import type { UserConfig } from '@tistory-react/shared';

describe('bundleXml', async () => {
  const testDir = normalizePath(join(__dirname, 'fixtures'));

  const getXmlConfig = async (config: UserConfig): Promise<string> => {
    await bundleXml(testDir, config);
    const xmlConfigPath = join(testDir, OUTPUT_DIR, 'index.xml');
    return await fs.readFile(xmlConfigPath, 'utf-8');
  };

  test('Should Generate Default XML When UserConfig Object Is Empty', async () => {
    const xml = await getXmlConfig({});
    expect(xml).toMatchInlineSnapshot(`
    "<?xml version="1.0" encoding="utf-8"?>
    <skin>
        <information>
            <name/>
            <version/>
            <description><![CDATA[]]></description>
            <license><![CDATA[]]></license>
        </information>
        <author>
            <name/>
            <homepage/>
            <email/>
        </author>
        <default>
            <recentEntries>5</recentEntries>
            <recentComments>5</recentComments>
            <recentTrackbacks>5</recentTrackbacks>
            <itemsOnGuestbook>10</itemsOnGuestbook>
            <tagsInCloud>30</tagsInCloud>
            <sortInCloud>3</sortInCloud>
            <expandComment>0</expandComment>
            <expandTrackback>0</expandTrackback>
            <lengthOfRecentNotice>25</lengthOfRecentNotice>
            <lengthOfRecentEntry>27</lengthOfRecentEntry>
            <lengthOfRecentComment>30</lengthOfRecentComment>
            <lengthOfRecentTrackback>30</lengthOfRecentTrackback>
            <lengthOfLink>30</lengthOfLink>
            <showListOnCategory>1</showListOnCategory>
            <showListLock>1</showListLock>
            <tree>
                <color>000000</color>
                <bgColor>ffffff</bgColor>
                <activeColor>000000</activeColor>
                <activeBgColor>eeeeee</activeBgColor>
                <labelLength>27</labelLength>
                <showValue>1</showValue>
            </tree>
            <contentWidth>0</contentWidth>
        </default>
    </skin>"
    `);
  });

  test('Should Convert to CDATA When Specific Property Is Present', async () => {
    const xml = await getXmlConfig({
      skinInfoConfig: { information: { description: 'test' } },
    });
    expect(xml).toContain('<description><![CDATA[test]]></description>');
    const xml2 = await getXmlConfig({
      skinInfoConfig: { information: { license: 'test' } },
    });
    expect(xml2).toContain('<license><![CDATA[test]]></license>');
  });

  test('Deepmerge', async () => {
    const xml = await getXmlConfig({
      skinInfoConfig: {
        information: { name: 'testName', description: 'testDescription' },
        author: { name: 'testName', homepage: 'testHomepage' },
        default: {
          recentTrackbacks: 10,
          tree: {
            color: 'ffffff',
            labelLength: 10,
          },
        },
      },
    });
    expect(xml).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="utf-8"?>
      <skin>
          <information>
              <name>testName</name>
              <version/>
              <description><![CDATA[testDescription]]></description>
              <license><![CDATA[]]></license>
          </information>
          <author>
              <name>testName</name>
              <homepage>testHomepage</homepage>
              <email/>
          </author>
          <default>
              <recentEntries>5</recentEntries>
              <recentComments>5</recentComments>
              <recentTrackbacks>10</recentTrackbacks>
              <itemsOnGuestbook>10</itemsOnGuestbook>
              <tagsInCloud>30</tagsInCloud>
              <sortInCloud>3</sortInCloud>
              <expandComment>0</expandComment>
              <expandTrackback>0</expandTrackback>
              <lengthOfRecentNotice>25</lengthOfRecentNotice>
              <lengthOfRecentEntry>27</lengthOfRecentEntry>
              <lengthOfRecentComment>30</lengthOfRecentComment>
              <lengthOfRecentTrackback>30</lengthOfRecentTrackback>
              <lengthOfLink>30</lengthOfLink>
              <showListOnCategory>1</showListOnCategory>
              <showListLock>1</showListLock>
              <tree>
                  <color>ffffff</color>
                  <bgColor>ffffff</bgColor>
                  <activeColor>000000</activeColor>
                  <activeBgColor>eeeeee</activeBgColor>
                  <labelLength>10</labelLength>
                  <showValue>1</showValue>
              </tree>
              <contentWidth>0</contentWidth>
          </default>
      </skin>"
      `);
  });
});
