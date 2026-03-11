import PocketBase from 'pocketbase'

const pb = new PocketBase('http://127.0.0.1:8090')

async function debug() {
  try {
    console.log('✅ Connexion à PocketBase réussie')
    
    console.log('\n--- Test artistes ---')
    const artistes = await pb.collection('artistes').getFullList()
    console.log(`✅ ${artistes.length} artistes trouvés`)
    
    console.log('\n--- Test scenes ---')
    const scenes = await pb.collection('scenes').getFullList()
    console.log(`✅ ${scenes.length} scènes trouvées`)
    
    console.log('\n--- Test representations ---')
    try {
      const reps = await pb.collection('representations').getFullList()
      console.log(`✅ ${reps.length} représentations trouvées`)
      if (reps.length > 0) {
        console.log('Première représentation :', reps[0])
      }
    } catch (error) {
      console.error('❌ Erreur sur representations :', error.message)
      console.error('Status:', error.status)
      console.error('Data:', error.data)
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

debug()
