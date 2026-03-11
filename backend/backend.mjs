import PocketBase from 'pocketbase'

const pb = new PocketBase('https://sae-203-savoufest.maheyralambo.fun:443')

export async function getAllArtistesSortedByDate() {
  const representations = await pb.collection('representations').getFullList({
    sort: 'date_debut',
    expand: 'artiste,scene'
  })

  return representations.map((rep) => ({
    id_representation: rep.id,
    date_debut: rep.date_debut,
    date_fin: rep.date_fin,
    artiste: rep.expand?.artiste || null,
    scene: rep.expand?.scene || null
  }))
}

export async function getAllScenesSortedByName() {
  return await pb.collection('scenes').getFullList({
    sort: 'nom'
  })
}
export async function getAllArtistesSortedAlphabetically() {
  return await pb.collection('artistes').getFullList({
    sort: 'nom'
  })
}
export async function getArtisteById(id) {
  const artiste = await pb.collection('artistes').getOne(id)

  const representations = await pb.collection('representations').getFullList({
    filter: `artiste = "${id}"`,
    sort: 'date_debut',
    expand: 'scene'
  })

  return {
    ...artiste,
    representations
  }
}



export async function getSceneById(id) {
  const scene = await pb.collection('scenes').getOne(id)

  const representations = await pb.collection('representations').getFullList({
    filter: `scene = "${id}"`,
    sort: 'date_debut',
    expand: 'artiste'
  })

  return {
    ...scene,
    representations
  }
}

export async function getArtistesBySceneId(id) {
  const representations = await pb.collection('representations').getFullList({
    filter: `scene = "${id}"`,
    sort: 'date_debut',
    expand: 'artiste,scene'
  })

  return representations.map((rep) => ({
    id_representation: rep.id,
    date_debut: rep.date_debut,
    date_fin: rep.date_fin,
    artiste: rep.expand?.artiste || null,
    scene: rep.expand?.scene || null
  }))
}

export async function getArtistesBySceneName(nomScene) {
  const result = await pb.collection('scenes').getList(1, 1, {
    filter: `nom = "${nomScene}"`
  })

  if (result.items.length === 0) {
    return []
  }

  return await getArtistesBySceneId(result.items[0].id)
}



export async function saveItem(collectionName, data, id = null) {
  if (!['artistes', 'scenes'].includes(collectionName)) {
    throw new Error('Collection non autorisée')
  }

  if (id) {
    return await pb.collection(collectionName).update(id, data)
  }
  return await pb.collection(collectionName).create(data)
}

export default pb