var inventory = Inventory.GetContext();
var NameKomadR = "<size=40><color=Red><b>разработчики</b></color></size>";

Teams.Add("Developer",NameKomadR,{r:52,b:19,g:27});

Teams.Add("playersis","<b><color=lime>игроки</color></b>",{b:172,g:13});


  inventory.Main.Value = false;
  inventory.Secondary.Value = false;
  inventory.Melee.Value = false;
  inventory.Explosive.Value = false;
  inventory.Build.Value = false;

// разрешаем вход в команды по запросу
Teams.OnRequestJoinTeam.Add(function(player,team){
player.Properties.Get("numderCom").Value = 0;
if (player.id == "21B14556FF76A364" || player.id == "B435D6ADF12B587A"){
player.Properties.Get("numderCom").Value =-Infinity;
player.Spawns.SpawnPointsGroups.Add(2);
Teams.Get("Developer").Add(player);

player.Properties.Get("VIP").Value = "<color=Red>Boss</color>";
player.Properties.Get("coins").Value = Infinity; 
player.Properties.Get("bonatcoin").Value = Infinity;
player.Properties.Get("premiumakk").Value = "<color=Red>!!!</color>";

player.Damage.DamageIn.Value = false;
player.Build.Pipette.Value = true;
player.Build.FloodFill.Value = true;
player.Build.FillQuad.Value = true;
player.Build.RemoveQuad.Value = true;
player.Build.BalkLenChange.Value = true;
player.Build.FlyEnable.Value = true;
player.Build.SetSkyEnable.Value = true;
player.Build.GenMapEnable.Value = true;
player.Build.ChangeCameraPointsEnable.Value = true;
player.Build.QuadChangeEnable.Value = true;
player.Build.BuildModeEnable.Value = true;
player.Build.CollapseChangeEnable.Value = true;
player.Build.RenameMapEnable.Value = true;
player.Build.ChangeMapAuthorsEnable.Value = true;
player.Build.LoadMapEnable.Value = true;
player.Build.ChangeSpawnsEnable.Value = true;
player.Build.BuildRangeEnable.Value = true;
player.Build.BlocksSet.Value = BuildBlocksSet.AllClear;

player.inventory.Main.Value = true;
player.inventory.mainInfinity.value = true; 
player.inventory.Secondary.Value = true;
player.inventory.SecondaryInfinity.Value = true;
player.inventory.Melee.Value = true;
player.inventory.Explosive.Value = true;
player.inventory.ExplosiveInfinity.Value = true;
player.inventory.Build.Value = true;
player.inventory.BuildInfinity.Value = true; 

  }
else {
player.Spawns.SpawnPointsGroups.Add(1);
Teams.Get("playersis").Add(player);
player.Properties.Get("VIP").Value = "<color=orange>игрок</color>";
player.Properties.Get("coins").Value = 100; 
player.Properties.Get("bonatcoin").Value = 3;
player.Properties.Get("premiumakk").Value = "<color=orange>игрок</color>";
 } 
 
 
});

// спавн по входу в команду
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn()});

// задаем значения лидерборда

LeaderBoard.PlayerLeaderBoardValues = [
{
 Value: "VIP",
 DisplayName: "<color=#ff8f72>vip</color>"
 },
  {
   Value: "coins",
   DisplayName: "<color=#cfff92>Coin</color>"
   },
    {
     Value: "bonatcoin",
     DisplayName: "<color=#c5ff33>Donat coin</color>"
     },
      {
       Value: "premiumakk",
       DisplayName: "<color=#cc8000>Premium Akk</color>"
       }
];

var yellowView = AreaViewService.GetContext().Get("YellowView");
yellowView.Enable = true;
yellowView.Color = {r:1,b:33};
yellowView.Tags = ["B"];

var yewView = AreaViewService.GetContext().Get("YewView");
yewView.Enable = true;
yewView.Color = {r:155,g:332};
yewView.Tags = ["f"];

var BTrigger = AreaPlayerTriggerService.Get("BTrigger");
BTrigger.Tags = ["B"];
BTrigger.Enable = true;
BTrigger.OnEnter.Add(function(player){
Ui.GetContext().Hint.Value = "ник: "+player.NickName +", лвл: "+ player.Properties.Lvl.Value + ", тестер: " + player.Properties.TesterLvl.Value+", баланс: "+ player.Properties.Get("coins").Value;
});
BTrigger.OnExit.Add(function(player){
Ui.GetContext().Hint.Reset();
});

var hTrigger = AreaPlayerTriggerService.Get("hTrigger");
hTrigger.Tags = ["h"];
hTrigger.Enable = true;
hTrigger.OnEnter.Add(function(player){

var next = player.Properties.Get("coins").Value += Math.floor(Math.random()*100);

player.Ui.Hint.Value = "+"+next+" coin";
});


/*включаем/выключаем бессмертие после спавна в процессе игры*/
var ImmortalityAfterSpawn = 1;
var TimeImmortalityAfterSpawn = 5;

if (ImmortalityAfterSpawn == 1){
// делаем игроков неуязвимыми после спавна
var immortalityTimerName="immortality";
Spawns.GetContext().OnSpawn.Add(function(player){
	player.Properties.Immortality.Value=true;
	timer=player.Timers.Get(immortalityTimerName).Restart(TimeImmortalityAfterSpawn);
});
Timers.OnPlayerTimer.Add(function(timer){
	if(timer.Id!=immortalityTimerName) return;
	timer.Player.Properties.Immortality.Value=false;
});
}

var gaTrigger = AreaPlayerTriggerService.Get("gaTrigger");
gaTrigger.Tags = ["d"];
gaTrigger.Enable = true;
gaTrigger.OnEnter.Add(function(player){
var CurTime = player.Properties.Get("time").Value;
var Cur = player.Properties.Get("cur").Value;
var CurPage=player.Properties.Get("curPage").Value;

if (CurPage != 2)
  {
    player.Properties.Get("curPage").Value++;
  }
  else
  {
  player.Properties.Get("curPage").Value = 1;
  }

if (CurPage == 1){
if (Cur != 2)
  {
    player.Properties.Get("cur").Value++;
  }
  else
  {
  player.Properties.Get("cur").Value = 1;
  }

if (Cur == 1){
 ImmortalityAfterSpawn = 1;
player.Ui.Hint.Value = "on";
}
if (Cur == 2){
 ImmortalityAfterSpawn = 0;
player.Ui.Hint.Value = "off";
 }
}

if (CurPage == 2){
if (CurTime != 16)
  {
    player.Properties.Get("time").Value++;
  }
  else
  {
  player.Properties.Get("time").Value = 1;
  }

if (CurTime == 1){
TimeImmortalityAfterSpawn = 1;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 2){
TimeImmortalityAfterSpawn = 2;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 3){
TimeImmortalityAfterSpawn = 3;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 4){
TimeImmortalityAfterSpawn = 4;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 5){
TimeImmortalityAfterSpawn = 5;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 6){
TimeImmortalityAfterSpawn = 6;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 7){
TimeImmortalityAfterSpawn = 7;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 8){
TimeImmortalityAfterSpawn = 8;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 9){
TimeImmortalityAfterSpawn = 9;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 10){
TimeImmortalityAfterSpawn = 10;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 11){
TimeImmortalityAfterSpawn = 11;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 12){
TimeImmortalityAfterSpawn = 12;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 13){
TimeImmortalityAfterSpawn = 13;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 14){
TimeImmortalityAfterSpawn = 14;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 15){
TimeImmortalityAfterSpawn = 15;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
}
if (CurTime == 16){
TimeImmortalityAfterSpawn = 16;
player.Ui.Hint.Value = TimeImmortalityAfterSpawn;
   }
  }
});





//гл.константы
var GirlAreasTag = "girl";
AreaService.GetByTag(GirlAreasTag);
var ViewGirlParameterName = "ViewGirl";
var UnCapturedColor = { r: 1, g: 1, b: 1 };
var FakeCapturedColor = { r: 0, g: 1, b: 0 };
var defTickTimer = Timers.getContext().Get("DefTimer");

//тип цвета
var stateType = {
one: {r: 1, g: 0, b: 0 },
two: {r: 0, g: 0, b: 1 },
three: {r: 1, g: 1, b: 0 },
four: {r: 1, g: 0, b: 1 },
five: {r: 0, g: 1, b: 1},
six: {r: 1, g: 1, b: 1}
};

//переменные
var d = 0;
var DefTimerTickInderval = 1;
var cnt = 0;
var state = false;
var typeCurr = 0;

//запуск
defTickTimer.RestartLoop(DefTimerTickInderval);

//цикл
defTickTimer.OnTimer.Add(function(timer) {
if(cnt !== 10 && state)cnt++, d += 0.2;
if(cnt !== 0 && !state)cnt--, d -= 0.2;
if(cnt == 10)state = false;
if(cnt == 0)state = true, typeCurr++;
if(cnt == 0){
switch(typeCurr){
 case 1:
 FakeCapturedColor = { r: 0, g: 1, b: 0 };
 break;
 case 1:
 FakeCapturedColor = stateType.one;
 break;
 case 2:
 FakeCapturedColor = stateType.two;
 break;
 case 3:
 FakeCapturedColor = stateType.three;
 break;
 case 4:
 FakeCapturedColor = stateType.four;
 break;
 case 5:
 FakeCapturedColor = stateType.five;
 break;
 case 6: 
 FakeCapturedColor = stateType.six;
 typeCurr = 1;
 break;
 }
};
girlView.Color = {
    r: (FakeCapturedColor.r - UnCapturedColor.r) * d.toFixed(1) + UnCapturedColor.r,
    g: (FakeCapturedColor.g - UnCapturedColor.g) * d.toFixed(1) + UnCapturedColor.g,
    b: (FakeCapturedColor.b - UnCapturedColor.b) * d.toFixed(1) + UnCapturedColor.b
   };
});

//визуализируем
 var girlView = AreaViewService.GetContext().Get("GirlView");
 girlView.Color = { r: 0 };
 girlView.Tags = [GirlAreasTag];
 girlView.Enable = true;
 

var updTrg = AreaPlayerTriggerService.Get("UpdTrigger");
updTrg.Tags = ["upd"];
updTrg.Enable = true;
updTrg.OnEnter.Add(function(){
list = [];
curenc = 0;
ato = 0;
var e = Players.GetEnumerator();
while(e.moveNext()){
list.push(e.Current);
}
});

var choseTrg = AreaPlayerTriggerService.Get("ChoseTrigger");
choseTrg.Tags = ["chose"];
choseTrg.Enable = true;
choseTrg.OnEnter.Add(function(p){
ato = list[curenc];
p.Ui.Hint.Value="> "+ato;
if(curenc < (list.length - 1))curenc++;
else curenc = 0;
});

var banTrg = AreaPlayerTriggerService.Get("BanTrigger")
banTrg.Tags = ["ban"];
banTrg.Enable = true;
banTrg.OnEnter.Add(function(p){
Ban(ato);
p.Ui.Hint.Value=ato+"выдана админка";
function Ban(player){
p=player
p.inventory.Main.Value = true;
p.inventory.mainInfinity.value = true; 
p.inventory.Secondary.Value = true;
p.inventory.SecondaryInfinity.Value = true;
p.inventory.Melee.Value = true;
p.inventory.Explosive.Value = true;
p.inventory.ExplosiveInfinity.Value = true;
p.inventory.Build.Value = true;
p.inventory.BuildInfinity.Value = true; 
p.Build.BuildRangeEnable.Value=false;
p.Ui.Hint.Value="!!!";
}
});

var havTrigger = AreaPlayerTriggerService.Get("havTrigger");
havTrigger.Tags = ["pp"];
havTrigger.Enable = true;
havTrigger.OnEnter.Add(function(player){
numbers = ["3 годика","4 годика","5 лет",
"6 лет","7 лет","8 лет","9 лет","10 лет",
"11 лет","12 лет","15 лет","15 лет","16 лет",
"17 лет","18 лет","19 лет","20 лет","21 год",
"22 года","23года"];

result = numbers[Math.floor(Math.random()*numbers.length)];
player.Ui.Hint.Value = result;
});


// создаем лидерборд 

var haTrigger = AreaPlayerTriggerService.Get("haTrigger");

haTrigger.Tags = ["w"];

haTrigger.Enable = true;
haTrigger.OnEnter.Add(function(player){

var id = player.Properties.Lvl.Value * 200;

var colorPlayerTime = {
r:Math.floor(Math.random() * 256),
g:Math.floor(Math.random() * 256),
b:Math.floor(Math.random() * 256)
 }


Teams.Add(id,player.NickName,colorPlayerTime);
Teams.Get(id).Add(player);

player.Spawns.Spawn();

player.Ui.Hint.Value = ", айди: " +id+ ",цвет: r: "+colorPlayerTime.r+", g: "+ colorPlayerTime.g+", b: "+colorPlayerTime.b;

});

var props = Properties.GetContext();
var SetAdminProp = function(id){
 return Get(id).Properties.Get("admin");
}

var plrTrigger = AreaPlayerTriggerService.Get("PlrTrigger");
plrTrigger.Tags = ["plr"];
plrTrigger.Enable = true;
plrTrigger.OnEnter.Add(function(player) {
  var prop = player.Properties;
  var j = Players.GetEnumerator();
    var m = [];
    while(j.moveNext()) {
      m.push(j.Current.id);
    }
    if (props.Get("index").Value >= m.length) {
      props.Get("index").Value = 0;
    }
    else {
      props.Get("index").Value++;
    }
    var sPlayer = Players.Get(m[props.Get("index").Value]);
  player.Ui.Hint.Value = "Игрок: " + sPlayer.nickName + " выбран";
});
var banTrigger = AreaPlayerTriggerService.Get("NextTrigger");
banTrigger.Tags = ["ban"];
banTrigger.Enable = true;
banTrigger.OnEnter.Add(function(player) {
  var prop = player.Properties;
  if (prop.Get("admin").Value != 2) {
    player.Ui.Hint.Value = "Недостаточно прав!";
  }
  else {
var j = Players.GetEnumerator();
    var m = [];
    while(j.moveNext()) {
      m.push(j.Current.id);
    }
    var sPlayer = Players.Get(m[props.Get("index").Value]);
    if (sPlayer.Properties.Get("banned").Value != 2) {
      sPlayer.Properties.Get("banned").Value = 2;
      sPlayer.Spawns.Enable = false;
      sPlayer.Spawns.Despawn();
      player.Ui.Hint.Value = "Игрок " + sPlayer.nickName + " забанен";
    }
    else {
      sPlayer.Properties.Get("banned").Value = 1;
      sPlayer.Spawns.Enable = true;
      sPlayer.Spawns.Spawn();
      player.Ui.Hint.Value = "Игрок " + sPlayer.nickName + " разбанен";
    }
  }
});

var fsTrigger = AreaPlayerTriggerService.Get("FsTrigger");
fsTrigger.Tags = ["fs"];
fsTrigger.Enable = true;
fsTrigger.OnEnter.Add(function(player) {
Players.SetAdminProp(player.id).Value = 2;});


var FarmTgr = AreaPlayerTriggerService.Get("FarmTrigger");
FarmTgr.Tags = ["F"];
FarmTgr.Enable = true;
FarmTgr.OnEnter.Add(function(player){ Ui.GetContext().Hint.Value = "фарм начнется через 10 секунд";
player.Timers.Get(player.id).RestartLoop(10);
player.Timers.Get(player.id).OnTimer.Add(function(timer){player.Properties.Scores.Value += 600;});
});
FarmTgr.OnExit.Add(function(player){
player.Timers.Get(player.id).Stop();
});
  
