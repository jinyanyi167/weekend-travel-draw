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

assert.ok(app.destinations.length > app.departures.length, "目的地库应多于出发城市，覆盖更多城市探索目的地");
assert.ok(app.departures.length >= 360, "出发城市应覆盖全国地级行政区");
for (const name of ["北京", "上海", "广州", "阿勒泰", "喀什", "大理", "澳门"]) {
  assert.ok(app.departures.some((item) => item.city === name), `${name} 应纳入出发城市`);
}
for (const name of ["衡水", "丽水", "天水"]) {
  assert.ok(app.departures.some((item) => item.city === name), `${name} 出发城市名称不应被截断`);
}
for (const name of ["邯郸", "衡水", "克拉玛依", "阿克苏"]) {
  assert.ok(app.destinations.some((item) => item.name === name), `${name} 应纳入城市探索目的地`);
}
for (const id of ["qingtian", "songyang", "yunhe", "jiashan", "changshu"]) {
  assert.ok(app.destinations.some((item) => item.id === id), `${id} 应纳入目的地库`);
}

const suzhou = app.destinations.find((item) => item.id === "suzhou");
const driveHours = app.estimateDriveHours(shanghaiStart, suzhou);
assert.ok(driveHours > 0 && driveHours < 2.5, "上海到苏州应在短途范围内");

const nearDriveSettings = { ...baseSettings, travelMode: "drive2" };
const nearDriveCandidates = app.getCandidates(nearDriveSettings);
assert.ok(nearDriveCandidates.length > 5, "上海1～2小时自驾应有多个候选");
assert.ok(
  nearDriveCandidates.every((item) => !item.inRange || (item.hours >= 0.75 && item.hours <= 2)),
  "1～2小时自驾候选应落在近程自驾区间"
);

const strictCandidates = app.getCandidates(baseSettings);
assert.ok(strictCandidates.length > 5, "上海2～4小时自驾圈应有多个候选");
assert.ok(strictCandidates.every((item) => item.inRange), "严格模式不应保留范围外目的地");
assert.ok(
  strictCandidates.every((item) => item.hours >= 2 && item.hours <= 4),
  "2～4小时自驾候选应避开过近目的地"
);
assert.ok(
  strictCandidates.some((item) => !nearDriveCandidates.some((near) => near.dest.id === item.dest.id)),
  "2～4小时自驾应提供区别于1～2小时自驾的候选"
);

const xianStart = app.departures.find((item) => item.city === "西安");
const xianCandidates = app.getCandidates({ ...baseSettings, startCity: xianStart.id, travelMode: "drive4" });
assert.ok(xianCandidates.length >= 8, "西安2～4小时自驾圈应有足够周边候选");
assert.notStrictEqual(xianCandidates[0].dest.name, "西安", "西安出发不应总是优先抽到本城");

for (const city of ["沈阳", "哈尔滨", "济南", "福州", "广州", "成都", "昆明", "兰州", "乌鲁木齐", "海口"]) {
  const start = app.departures.find((item) => item.city === city);
  const candidates = app.getCandidates({ ...baseSettings, startCity: start.id, travelMode: "drive4" });
  assert.ok(candidates.length >= 2, `${city} 出发应有多个候选`);
  assert.ok(candidates.every((item) => item.dest.name !== city), `${city} 出发的候选不应包含本城`);
  assert.notStrictEqual(candidates[0].dest.name, city, `${city} 出发不应优先抽到本城`);
}

const looseCandidates = app.getCandidates({ ...baseSettings, strictRange: false, surpriseMode: true });
assert.ok(looseCandidates.length > strictCandidates.length, "惊喜位应扩大候选池");

const normalSuzhou = app.scoreDestination(suzhou, nearDriveSettings).score;
const visitedSuzhou = app.scoreDestination(suzhou, { ...nearDriveSettings, visited: ["suzhou"] }).score;
assert.ok(visitedSuzhou < normalSuzhou, "已去过目的地应被降权");

const lowPreferenceSuzhou = app.scoreDestination(suzhou, { ...nearDriveSettings, nature: 0, culture: 0, food: 0, quiet: 0, romance: 0, budget: 0 }).score;
const highPreferenceSuzhou = app.scoreDestination(suzhou, { ...nearDriveSettings, nature: 100, culture: 100, food: 100, quiet: 100, romance: 100, budget: 100 }).score;
assert.strictEqual(lowPreferenceSuzhou, highPreferenceSuzhou, "抽签权重不应再受用户偏好值影响");

const picked = app.weightedPick(strictCandidates, () => 0.01);
assert.ok(picked && picked.dest && picked.score > 0, "加权抽签应返回有效目的地");

console.log("logic tests passed");
