//ログイン中ユーザー取得専用のpluginの追加
export default ({ app },inject) => {
     inject('auth', ()=>{
          return new Promise((resolve) =>{
               app.$fireAuth.onAuthStateChanged((auth)=>{
                    //onAuthStateChangedはログインチェックに必要
                    //app.$fireAuthはfirebase.jsのinject('fireAuth', firebase.auth())を呼び出している

                    resolve(auth || null)
               })
          })
     })
}