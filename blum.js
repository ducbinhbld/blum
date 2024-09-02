const axios = require('axios');
const colors = require('colors');
const fs = require('fs');
const {DateTime} = require("luxon");
const users = JSON.parse(fs.readFileSync('blum.json', 'utf8'));

async function getHeaders(token) {
  return {
      'authorization': `Bearer ${token}`,
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'content-length': 'application/json',
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
    'content-type': 'application/json',
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
  const headers = getHeaders(user.access)
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
  const headers = getHeaders(user.access)
  try {
    const res = await axios.get('https://game-domain.blum.codes/api/v1/user/balance', {headers: headers});
    return res.data
  } catch (e) {
    console.log('getBalance', e.message)
    return null
  }
}

async function dailyReward(user) {
  const headers = getHeaders(user.access)
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
   const headers = getHeaders(user.access)

  const res = await axios.post('https://game-domain.blum.codes/api/v1/game/play', {}, {headers: headers});
  return res.data.gameId ?? ''
}

async function claimGame(user, gameId) {
  const url = 'https://game-domain.blum.codes/api/v1/game/claim';
  const headers = getHeaders(user.access)

  const randCoin = Math.floor(Math.random() * 180) + 31;
  await axios.post(url, {
    gameId: gameId,
    points: randCoin

  }, {headers: headers});

}

async function claimBalance(user) {
  const headers = getHeaders(user.access)
  try {
    const res = await axios.post('https://game-domain.blum.codes/api/v1/farming/claim', {}, {headers: headers});
    return res.status === 200
  } catch (e) {
    console.log(e.response.data)
    return false
  }
}

async function startFarming(user) {
  const headers = getHeaders(user.access)
  try {
    await axios.post('https://game-domain.blum.codes/api/v1/farming/start', {}, {headers: headers});
    console.log("Start farming success!");
  }catch (e) {
    console.log("Start farming error!");
  }
}

async function checkBalanceFriend(user) {
  const headers = getHeaders(user.access)
  try {
    await axios.get('https://gateway.blum.codes/v1/friends/balance', {headers: headers});
  } catch (e) {
  }
}

async function getTasks(user) {
  const headers = getHeaders(user.access)
  try {
    const response = await axios.get('https://game-domain.blum.codes/api/v1/tasks', {headers: headers});
    return response.data;
  } catch (error) {
    console.log(`Không thể lấy danh sách nhiệm vụ: ${error.message}`);
    return [];
  }
}

async function startTask(user, taskId) {
  const headers = getHeaders(user.access)
  try {
    const response = await axios.post(`https://game-domain.blum.codes/api/v1/tasks/${taskId}/start`, {}, {headers: headers});
    return response.data;
  } catch (error) {
     console.log(`Không thể bắt đầu nhiệm vụ ${taskId}: ${error.message}`);
    return null;
  }
}

async function claimTask(user, taskId) {
  const headers = getHeaders(user.access)
  try {
    const response = await axios.post(`https://game-domain.blum.codes/api/v1/tasks/${taskId}/claim`, {}, {headers: headers});
    return response.data;
  } catch (error) {
    return null;
  }
}


// Sử dụng các hàm đã định nghĩa ở trên
(async () => {
  console.log(`============== BLUM ==============`);
  console.log(`============== ${DateTime.now().toString()} ==============`);
  for (let i = 0; i < users.length; i++) {
    console.log(`Bắt đầu tài khoản ${users[i].user ?? ''}`)
    let user = users[i];
    user = await getUserInfo(user, i);
    if (user === null) {
      console.log('Không tìm thấy thông tin người dùng: ', users[i].user);
      break;
    }
    console.log("Lấy token mới : ", user.access === users[i].access)
    const balance = await getBalance(user);
    const dataTask = await getTasks(user);
    for (const task of dataTask){
      for ( const t of task.tasks){
        await startTask(user, t.id);        
        await claimTask(user, t.id);
      }
    }

    await checkBalanceFriend(user);
    await dailyReward(user);
    if (balance && typeof balance.farming === 'undefined') {
      const claimRes = await claimBalance(user);
      if (claimRes) {
        const randTime1 = Math.floor(Math.random() * 3) + 1;
        await new Promise(resolve => setTimeout(resolve, (2 + randTime1) * 1000));
        await startFarming(user);
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



// const testIframe = async () => {
//   const urlIframe = "https://telegram.blum.codes/?tgWebAppStartParam=ref_LLFAa9MncV#tgWebAppData=user%3D%257B%2522id%2522%253A1506739484%252C%2522first_name%2522%253A%2522BiBi%2522%252C%2522last_name%2522%253A%2522John%2522%252C%2522username%2522%253A%2522Bibijohn%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D-2113389471080947851%26chat_type%3Dprivate%26start_param%3Dref_LLFAa9MncV%26auth_date%3D1725267999%26hash%3D6326c1af3f123f3056bfb93d0ebff808ad360af89ebf9ed08b1e35b6424ce3af&amp;tgWebAppVersion=7.8&amp;tgWebAppPlatform=weba&amp;tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22text_color%22%3A%22%23000000%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%233390ec%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%23707579%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23e53935%22%7D";
//   const res = await axios.get(urlIframe)
//   console.log('res ', res)
//   console.log('resData ', res.data)
//   console.log('resData Json', res.data.json())
// }
// testIframe();