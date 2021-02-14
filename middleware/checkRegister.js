export default async({ redirect,app })=>{
     if(await app.$user()){
          //すでにアカウント作成済の場合はTOPページへリダイレクト
          redirect('/')
     }
}

// 先程作成した plugin を呼び出し、もしアカウント情報が取得できたら
// (= すでに userCollection に紐付くユーザーが存在すれば)、
// すでにアプリケーションを使用できる状態なので、TOP
//  ページにリダイレクトさせます。

