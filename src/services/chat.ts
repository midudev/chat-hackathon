import { Client } from '@twilio/conversations'

export const createOrJoinConversation = async (
  { room, accessToken } : { room: string, accessToken: string }
  ) => {
    const client = new Client(accessToken)

    return new Promise(resolve => {
      client.on('stateChanged', async state => {
        if (state === 'initialized') {
          let conversation

          try {
            conversation = await client.createConversation({ uniqueName: room })

            // await conversation?.add('ma')
            // await conversation?.add('mb')

          } catch (e) {
            console.error(e)
            
            try {
              conversation = await client.getConversationByUniqueName(room)

              // await conversation?.add('ma')
              // await conversation?.add('mb')
            } catch (e) {
              console.error(e)
            }
          }

          console.log(conversation)

          resolve(conversation)          
        }
      })
    })
  }