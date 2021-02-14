// アカウント登録まで終わっているかをチェックする

export default async ({ redirect, app })=>{
     const user = await app.$user()
     if(!user){
          redirect('/register')
     }
}
// ログインしていない場合は＄user()内でログインページへリダイレクトさせる