const assert = require("assert");
const app = require("../app.js");

const shanghaiStart = app.departures.find((item) => item.city === "上海");
const baseSettings = {
  startCity: shanghaiStart.id,
  travelMode: "drive4",
  tripDays: "2",
  visitedPenalty: "0.25",
  strictRange: true,
  surpriseMode: false,
  visited: [],
  nature: 60,
  culture: 70,
  food: 80,
  quiet: 50,
  romance: 70,
  budget: 60,
};

assert.ok(app.destinations.length >= 70, "目的地库应覆盖足够多城市和县域目的地");
assert.ok(app.departures.length >= 360, "出发城市应覆盖全国地级行政区");
for (const name of ["北京", "上海", "广州", "阿勒泰", "喀什", "大理", "澳门"]) {
  assert.ok(app.departures.some((item) => item.city === name), `${name} 应纳入出发城市`);
}
for (const id of ["qingtian", "jiashan", "changshu"]) {
  assert.ok(app.destinations.some((item) => item.id === id), `${id} 应纳入目的地库`);
}

const suzhou = app.destinations.find((item) => item.id === "suzhou");
const driveHours = app.estimateDriveHours(shanghaiStart, suzhou);
assert.ok(driveHours > 0 && driveHours < 2.5, "上海到苏州应在短途范围内");

const strictCandidates = app.getCandidates(baseSettings);
assert.ok(strictCandidates.length > 5, "上海4小时自驾圈应有多个候选");
assert.ok(strictCandidates.every((item) => item.inRange), "严格模式不应保留范围外目的地");

const looseCandidates = app.getCandidates({ ...baseSettings, strictRange: false, surpriseMode: true });
assert.ok(looseCandidates.length > strictCandidates.length, "惊喜位应扩大候选池");

const normalSuzhou = app.scoreDestination(suzhou, baseSettings).score;
const visitedSuzhou = app.scoreDestination(suzhou, { ...baseSettings, visited: ["suzhou"] }).score;
assert.ok(visitedSuzhou < normalSuzhou, "已去过目的地应被降权");

const picked = app.weightedPick(strictCandidates, () => 0.01);
assert.ok(picked && picked.dest && picked.score > 0, "加权抽签应返回有效目的地");

console.log("logic tests passed");
