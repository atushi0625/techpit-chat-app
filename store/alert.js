export const state = () =>({
     message: null //エラーが発生した時にメッセージにデータをセット
})

export const getters = {
     message:(state) => state.message
// getters はコンポーネントから store のデータを参照する時に使用します。
// コンポーネントから直接 state を参照することも出来ますが、一般的には 
// getters を介して state を参照することが多いです。
}

export const mutations = {
     setMessage(state, { message }){
          state.message = message
     },

     deleteMessage(state){
          state.message = null
     }

     // mutation は state を変更する時に呼ばれる場所です。
     // state は直接変更することは出来ません。
     // 必ず、mutation を介して値を変更します。
}