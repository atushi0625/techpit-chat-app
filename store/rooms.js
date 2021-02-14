// チャットルーム用のvuexモジュール

export const state = ()=>({
     rooms:[]  //取得したデータはここに保存される
})

export const getters = {
     rooms:(state) => state.rooms
}

export const mutations = {
     add(state,{ room }){
      const isNotAdded = !state.rooms.find((r) => r.id === room.id)    
      if(isNotAdded){
           state.rooms.push(room)

// 同じ ID のデータが存在しないかチェックしてからデータを配列の先頭に追加しています。
      }
     },

     update(state, { room }) {
          state.rooms = state.rooms.map((r)=>{
          if(r.id === room.id){
               r = room
          }
          return r
          })
          // シンプルに ID が一致したデータをそのまま置き換えています。                                                                               
     },

     remove(state, { room }){
          state.rooms = state.rooms.filter((r)=> r.id!==room.id)
     },
     // 配列から一致した ID のデータを取り除いています。

     clear(state){
          state.rooms = []
     }
}

 export const actions = {
     subscribe({ commit }){
          return this.$firestore
          .collection('rooms')
          .orderBy('createdAt', 'asc')//roomsのコレクションのデータを作成日の昇順で取得
          .onSnapshot((roomsSnapShot)=>{
               roomsSnapShot.docChanges().forEach((snapshot)=>{
  //データベース上に変更があった場合、すぐに反映させるリアルタイムアップデートをonSnapshotを使用して取得
  //データの追加、削除、更新を検知する                  
                    const room = {
                         id: snapshot.doc.id,
                         ...snapshot.doc.data()//実際の部屋名などを受け取ることができる
                    }

                    // タイプによって State に対する処理を以下のように分けます。
               switch(snapshot.type){
                    case 'added':　　//配列にデータをpushする
                    commit('add', { room })
                    break

                    case 'modified':　//変更のあったデータに配列内のデータを置き換える
                         commit('update', { room })
                         break

                    case 'removed':　//配列からデータ削除
                    commit('removed', { room })
                    break
                    }
               })
          })
     },

     clear({ commit }){
          commit('clear')
     }
}


// snapshot.doc.data()で受け取ったデータは以下のようになります。
// {
//      name: '今日の晩御飯について話す部屋',
//      topImageUrl: 'https://firebasestorage....',
//      createdAt: '2020/1/7 7:43:40'
//    }
   