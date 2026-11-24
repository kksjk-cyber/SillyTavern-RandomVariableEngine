import test from 'node:test';import assert from 'node:assert/strict';import {metadataOnly,metadataBlocks,readMetadata,appearanceDefaults} from './presentation.js';
const payload='<scene><time>18:30</time><day>第3日</day><week>周五</week><location>雾港</location></scene>\n<choose>\nA. 调查灯塔\nB. 等待船只\n</choose>\n<rv-used>1</rv-used>';
test('closed metadata fence parsed',()=>{const r=readMetadata('正文\n\n```rve-meta\n'+payload+'\n```');assert.deepEqual(r.parsed.choices,['调查灯塔','等待船只']);assert.equal(r.parsed.scene.location,'雾港');assert.deepEqual(r.parsed.used,[1]);assert.equal(r.blocks.length,1);});
test('do not hide narrative mixed in fence',()=>assert.equal(metadataOnly(payload+'\n正文'),false));
test('incomplete fence not eligible for hiding',()=>assert.deepEqual(metadataBlocks('```rve-meta\n'+payload),[]));
test('legacy tags read',()=>assert.equal(readMetadata('正文'+payload).parsed.scene.time,'18:30'));
test('unrecognized data not hidden',()=>assert.equal(metadataOnly('<other>正文</other>'),false));
test('unclosed tag not hidden',()=>assert.equal(metadataOnly('<rv-status>状态'),false));
test('appearance settings default',()=>assert.deepEqual(appearanceDefaults,{chatCards:true,cleanChat:true,showTurn:true,expandTurn:false}));
