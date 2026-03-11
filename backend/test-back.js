import {
  getAllArtistesSortedByDate,
  getAllScenesSortedByName,
  getAllArtistesSortedAlphabetically,
  getArtisteById,
  getSceneById,
  getArtistesBySceneId,
  getArtistesBySceneName,
  saveItem
} from './backend.mjs'

async function runTests() {
  try {
    // T2
    console.log('\n T2')
    const scenes = await getAllScenesSortedByName()
    console.log(scenes)
    console.log(`Nombre de scènes : ${scenes.length}`)

    // T3
    console.log('\n T3')
    const artistes = await getAllArtistesSortedAlphabetically()
    console.log(artistes)
    console.log(`Nombre d'artistes : ${artistes.length}`)

    // T1
    console.log('\n T1')
    const artistesParDate = await getAllArtistesSortedByDate()
    if (artistesParDate.length > 0) {
      console.log(artistesParDate)
    } else {
      console.log('Aucune représentation dans la base')
    }
    console.log(`Nombre de représentations : ${artistesParDate.length}`)

    // T4
    console.log('\n T4')
    if (artistes.length > 0) {
      const premierId = artistes[0].id
      console.log('ID testé :', premierId)
      const artiste = await getArtisteById(premierId)
      console.log(`Artiste : ${artiste.nom}`)
      console.log(`Représentations : ${artiste.representations.length}`)
      if (artiste.representations.length > 0) {
        console.log(artiste.representations)
      }
    } else {
      console.log('Aucun artiste dans la base')
    }

    // T5
    console.log('\n T5')
    if (scenes.length > 0) {
      const premierId = scenes[0].id
      console.log('ID testé :', premierId)
      const scene = await getSceneById(premierId)
      console.log(scene)
    } else {
      console.log('Aucune scène dans la base')
    }

    // T6
    console.log('\n T6')
    if (scenes.length > 0) {
      const premierId = scenes[0].id
      console.log('ID testé :', premierId)
      const artistesScene = await getArtistesBySceneId(premierId)
      console.log(artistesScene)
    } else {
      console.log('Aucune scène dans la base')
    }

    // T7
    console.log('\n T7')
    if (scenes.length > 0) {
      const nomScene = scenes[0].nom
      console.log('Nom testé :', nomScene)
      const artistesScene = await getArtistesBySceneName(nomScene)
      console.log(artistesScene)
    } else {
      console.log('Aucune scène dans la base')
    }

    /* T8 
    console.log('\n T8')
    const nouvelArtiste = await saveItem('artistes', {
       nom: 'Artiste Test',
       description: 'Un artiste de test'
     })
     console.log('Artiste créé :', nouvelArtiste)
     */


    console.log('\n Tous les tests sont terminés')

  } catch (error) {
    console.error('\n Erreur lors des tests :')
    console.error('Message :', error.message)
    if (error.data) console.error('Data :', error.data)
    if (error.status) console.error('Status :', error.status)
  }
}

runTests()
