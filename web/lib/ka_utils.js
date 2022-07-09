let baseUrl = "https://www.khanacademy.org/api/internal";
async function login(username, password) {
  let res = await fetch(`${baseUrl}/graphql/loginWithPasswordMutation`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "x-ka-fkey": "lol",
      cookie: "fkey=lol",
    },
    body: `{\"operationName\":\"loginWithPasswordMutation\",\"variables\":{\"identifier\":\"${username}\",\"password\":\"${password}\"},\"query\":\"mutation loginWithPasswordMutation($identifier: String!, $password: String!) {\\n  loginWithPassword(identifier: $identifier, password: $password) {\\n    user {\\n      id\\n      kaid\\n      canAccessDistrictsHomepage\\n      isTeacher\\n      hasUnresolvedInvitations\\n      transferAuthToken\\n      preferredKaLocale {\\n        id\\n        kaLocale\\n        status\\n        __typename\\n      }\\n      __typename\\n    }\\n    isFirstLogin\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
    method: "POST",
    mode: "cors",
  });
  let data = await res.headers.get("set-cookie");
  let kaas = (data.match(/KAAS=([\w-]+)/) || [])[1];
  return kaas;
}

const withHeader = (kaas) => {
  return {
    "content-type": "application/json",
    "x-ka-fkey": `lol`,
    cookie: `KAAS=${kaas}; fkey=lol`,
  };
};

async function createProgram(
  kaas,
  code,
  title = "New Program",
  width = 400,
  height = 400,
  type = "pjs",
  base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="
) {
  let res = await fetch(`${baseUrl}/scratchpads`, {
    headers: withHeader(kaas),
    body: JSON.stringify({
      userAuthoredContentType: type,
      title,
      // width,
      // height,
      revision: {
        code: code,
        folds: [],
        image_url: `${base64}`,
      },
    }),
    method: "POST",
  });
  // Return error if there is one
  return res;
}

async function getProgram(id) {
  let res = await fetch(`${baseUrl}/scratchpads/${id}`);
  return tes;
}

export { login, createProgram, getProgram };
