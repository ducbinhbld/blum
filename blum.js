const axios = require('axios');
const colors = require('colors');
const fs = require('fs');
const path = require('path');
const {DateTime} = require("luxon");
const users = JSON.parse(fs.readFileSync('blum.json', 'utf8'));

const IFRAME = "https://telegram.blum.codes/#tgWebAppData=query_id%3DAAHSSfZJAgAAANJJ9kkA9t8v%26user%3D%257B%2522id%2522%253A5535844818%252C%2522first_name%2522%253A%2522Tony%2522%252C%2522last_name%2522%253A%2522Pham%2522%252C%2522username%2522%253A%2522TonyPham01%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D1725433916%26hash%3Da5577ea4df778ef493446c7e332a0b634f19e87bbb56956a164a5f1cd9ca38fe&tgWebAppVersion=7.8&tgWebAppPlatform=weba&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23212121%22%2C%22text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23aaaaaa%22%2C%22link_color%22%3A%22%238774e1%22%2C%22button_color%22%3A%22%238774e1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%230f0f0f%22%2C%22header_bg_color%22%3A%22%23212121%22%2C%22accent_text_color%22%3A%22%238774e1%22%2C%22section_bg_color%22%3A%22%23212121%22%2C%22section_header_text_color%22%3A%22%23aaaaaa%22%2C%22subtitle_text_color%22%3A%22%23aaaaaa%22%2C%22destructive_text_color%22%3A%22%23e53935%22%7D"

async function getHeaders(user) {
  return {
      'authorization': `Bearer ${user.access}`,
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      // 'content-length': '0',
      'origin': 'https://telegram.blum.codes',
      'priority': 'u=1, i',
      'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  }
}

async function getNewToken(user) {
  const headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': '0',
    'origin': 'https://telegram.blum.codes',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  };

  const url = 'https://gateway.blum.codes/v1/auth/refresh';

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await axios.post(url, {
        refresh: user.refresh
      }, {headers: headers});

      if (response.status === 200) {
        console.log(colors.green('Token tạo thành công'));
        return response.data;
      } else {
        console.log(colors.red(`Lấy token thất bại, thử lại lần thứ ${attempt + 1}`));
      }
    } catch (e) {
      console.log(colors.red(`Lỗi khi lấy token: ${e.message}`));
    }
  }
  console.log(colors.red('Lấy token thất bại sau 3 lần thử.'));
  return null;
}

async function getUserInfo(user, index) {
  const headers = await getHeaders(user)
  try {
    await axios.get('https://gateway.blum.codes/v1/user/me', {headers: headers});
    return users[index];
  } catch (e) {
    const hasil = e.response.data;
    if (hasil.message === 'Token is invalid') {
      console.log(colors.red('Token không hợp lệ, đang lấy token mới...'));
      const newToken = await getNewToken(user);
      if (newToken) {
        console.log(colors.green('Đã có token mới, thử lại...'));
        users[index] = {
          ...users[index],
          ...newToken,
          user: users[index].user
        }
        fs.writeFileSync('blum.json', JSON.stringify(users, null, 4));
        return await getUserInfo(newToken, index);
      } else {
        console.log(colors.red('Lấy token mới thất bại.'));
        return null;
      }
    } else {
      console.log(colors.red('Không thể lấy thông tin người dùng'));
      return null;
    }
  }
}

async function getBalance(user) {
  const headers = await getHeaders(user)
  try {
    const res = await axios.get('https://game-domain.blum.codes/api/v1/user/balance', {headers: headers});
    return res.data
  } catch (e) {
    console.log('getBalance', e.message)
    return null
  }
}

async function dailyReward(user) {
  const headers = await getHeaders(user)
  let success = false;
  try {
    const res = await axios.get('https://game-domain.blum.codes/api/v1/daily-reward?offset=-420', {headers: headers});
    if (res.status === 200) {
      try {
        const randTime3 = Math.floor(Math.random() * 2) + 1;
        await new Promise(resolve => setTimeout(resolve, (1 + randTime3) * 1000));
        const re = await axios.post('https://game-domain.blum.codes/api/v1/daily-reward?offset=-420', {},{headers: headers});
        console.log('success', re.data, re.status)
      } catch (e) {
        console.log('error post daily-reward', e.message, e.response.data)
      }
    }
    success = true;
  } catch (e) {
    console.log('error get daily-reward', e.response.data)
  }
  try {
    await axios.get('https://game-domain.blum.codes/api/v1/time/now', {headers: headers});
  } catch (e) {
    console.log('error get now', e.response.data)
  }
  return success
}

async function playGame(user) {
  const headers = {
    'authorization': `Bearer ${user.access}`,
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-length': '0',
    'origin': 'https://telegram.blum.codes',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  };
  const res = await axios.post('https://game-domain.blum.codes/api/v1/game/play', {}, {headers: headers});
  return res.data.gameId ?? ''
}


async function claimGame(user, gameId) {
  const url = 'https://game-domain.blum.codes/api/v1/game/claim';
  const headers = {
    'authorization': `Bearer ${user.access}`,
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'origin': 'https://telegram.blum.codes',
    'priority': 'u=1, i',
    'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  };

  const randCoin = Math.floor(Math.random() * 180) + 31;
  await axios.post(url, {
    gameId: gameId,
    points: randCoin
  }, {headers: headers});
}

async function claimBalance(user) {
  const headers = await getHeaders(user)
  try {
    const res = await axios.post('https://game-domain.blum.codes/api/v1/farming/claim', {}, {headers: headers});
    return res.status === 200
  } catch (e) {
    console.log(e.response.data)
    return false
  }
}

async function startFarming(user) {
  const headers = await getHeaders(user)
  try {
    await axios.post('https://game-domain.blum.codes/api/v1/farming/start', {}, {headers: headers});
    console.log("Start farming success!");
  }catch (e) {
    console.log("Start farming error!");
  }
}

async function checkBalanceFriend(user) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.get(`https://gateway.blum.codes/v1/friends/balance`, { headers: headers });
    return response.data;
  } catch (error) {
    console.log(`Không thể kiểm tra số dư bạn bè: ${error.message}`);
    return null;
  }
}

async function claimBalanceFriend(user) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.post(`https://gateway.blum.codes/v1/friends/claim`, {}, { headers: headers });
    return response.data;
  } catch (error) {
    console.log(`Không thể nhận số dư bạn bè!`, 'error');
    return null;
  }
}

async function getTasks(user) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.get('https://game-domain.blum.codes/api/v1/tasks', {headers: headers});
    return response.data;
  } catch (error) {
    console.log(`Không thể lấy danh sách nhiệm vụ: ${error.message}`);
    return [];
  }
}

async function startTask(user, taskId) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.post(`https://game-domain.blum.codes/api/v1/tasks/${taskId}/start`, {}, {headers: headers});
    return response.data;
  } catch (error) {
    //  console.log(`Không thể bắt đầu nhiệm vụ ${taskId}: ${error.message}`);
    return null;
  }
}

async function claimTask(user, taskId) {
  const headers = await getHeaders(user)
  try {
    const response = await axios.post(`https://game-domain.blum.codes/api/v1/tasks/${taskId}/claim`, {}, {headers: headers});
    return response.data;
  } catch (error) {
    return null;
  }
}

async function joinTribe(user, tribeId) {
  const headers = await getHeaders(user)
  const url = `https://game-domain.blum.codes/api/v1/tribe/${tribeId}/join`;
  try {
    const response = await axios.post(url, {}, { headers: headers });
    if (response.status === 200) {
      console.log('Bạn đã gia nhập tribe thành công');
      return true;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'USER_ALREADY_IN_TRIBE') {
      console.log('Bạn đã gia nhập tribe rồi');
    } else {
      console.log(`Không thể gia nhập tribe: ${error.message}`);
    }
    return false;
  }
}
async function processToken() {
  let decodedData = "";
  try {
      const parsedUrl = new URL(IFRAME);
      
      const fragment = parsedUrl.hash.substring(1);
      console.log(fragment);
      // Extract tgWebAppData parameter
      const params = new URLSearchParams(fragment);
      const tgWebAppData = params.get('tgWebAppData');

      // Decode the tgWebAppData value
      decodedData = decodeURIComponent(tgWebAppData);
      const token = await getNewToken(decodedData);
      const userInfo = await getUserInfos(token);

      updateBlumJson(token, userInfo.username);
      return true
  } catch (e) {
      console.log("error", e);
  }
}

async function getNewToken(queryId) {
  const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "origin": "https://telegram.blum.codes",
    "referer": "https://telegram.blum.codes/"
  };

  const data = JSON.stringify({ query: queryId });
  const url = "https://gateway.blum.codes/v1/auth/provider/PROVIDER_TELEGRAM_MINI_APP";

  for (let attempt = 0; attempt < 3; attempt++) {
      console.log("Getting token...");
      try {
          const requestConfig = {
              method: 'post',
              url: url,
              data: data,
              headers: headers
          };
          const response = await axios(requestConfig);

          if (response.status === 200) {
              console.log("Token successfully created");
              return response.data.token.refresh;
          } else {
              console.log(response.data);
              console.log(`Failed to get token, attempt ${attempt + 1}`);
          }
      } catch (error) {
          console.log(`Failed to get token, attempt ${attempt + 1}`);
          console.log(error);
      }
  }
  return null;
}

function updateBlumJson(token, username) {
  try {
      const filePath = path.join(__dirname, './blum.json');
      const data = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(data);

      let userFound = false;
      for (const item of jsonData) {
          if (item.user === username) {
              item.access = token;
              userFound = true;
              break;
          }
      }

      if (!userFound) {
          jsonData.push({
              access: token,
              refresh: "",
              user: username
          });
      }

      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
      console.log('File updated successfully');
  } catch (error) {
      console.error('Error updating file:', error);
  }
}


async function getUserInfos(token) {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'origin': 'https://telegram.blum.codes',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0'
  };

  try {
      const requestConfig = {
          method: 'get',
          url: 'https://gateway.blum.codes/v1/user/me',
          headers,
      };
      const response = await axios(requestConfig);

      if (response.status === 200) {
          return response.data;
      } else {
          const result = response.data;

          if (result.message === 'Token is invalid') {
              console.log("Invalid token, getting a new token...");
              const newToken = await getNewToken("", proxy);
              if (newToken) {
                  console.log("New token obtained, trying again...");
                  return getUserInfo(newToken, proxy);
              } else {
                  console.log("Failed to get a new token.");
                  return null;
              }
          } else {
              console.log("Failed to get user information");
              return null;
          }
      }
  } catch (e) {
      // console.log(e);
      return null;
  }
}

// Sử dụng các hàm đã định nghĩa ở trên
(async () => {
  console.log(`============== BLUM ==============`);
  console.log(`============== ${DateTime.now().toString()} ==============`);
  await processToken()
  await new Promise(r => setTimeout(r, 2000));
  for (let i = 0; i < users.length; i++) {
    console.log(`Bắt đầu tài khoản ${users[i].user ?? ''}`)
    let user = users[i];
    user = await getUserInfo(user, i);
    if (user === null) {
      console.log('Không tìm thấy thông tin người dùng: ', users[i].user);
      continue;
    }
    console.log("Lấy token mới : ", user.access === users[i].access)
    const balance = await getBalance(user);
    await checkBalanceFriend(user);
    await claimBalanceFriend(user);
    await dailyReward(user);
    const tribeId = 'b372af40-6e97-4782-b70d-4fc7ea435022';
    await joinTribe(user, tribeId);
    if (balance && typeof balance.farming === 'undefined') {
      await startFarming(user);
    }

    const dataTask = await getTasks(user);
    for (const task of dataTask){
      for ( const t of task.tasks){
        await startTask(user, t.id);        
      }
    }

    for (const task of dataTask){
      for ( const t of task.tasks){
        await claimTask(user, t.id);
      }
    }

    let playPasses = balance.playPasses ?? 0;
    if (playPasses > 0) {
      const randTime2 = Math.floor(Math.random() * 4) + 1;
      await new Promise(resolve => setTimeout(resolve, (2 + randTime2) * 1000));

      console.log(`Có ${playPasses} lượt. Bắt đầu chơi game ....`);
      while (playPasses > 0) {
        const gameId = await playGame(user);
        if (gameId !== '') {
          const randTime3 = Math.floor(Math.random() * 5) + 1;
          await new Promise(resolve => setTimeout(resolve, (60 + randTime3) * 1000));
          await claimGame(user, gameId);
          console.log(`Kết thúc gameID ${gameId}`);
        }
        if (playPasses > 0) {
          console.log(`Còn lại ${playPasses - 1} lượt`);
        }
        playPasses -= 1;
      }
    } else {
      console.log(`Hết lượt chơi game .... `);
    }
  }
})();


