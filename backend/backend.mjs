import PocketBase from 'pocketbase'

const pb = new PocketBase('https://sae-203-savoufest.maheyralambo.fun:443')

function logPocketBaseError(scope, error) {
  console.error(`[PocketBase:${scope}]`, error)
}

export async function getAllArtistesSortedByDate() {
  let representations = []

  try {
    representations = await pb.collection('representations').getFullList({
      sort: 'date_debut',
      expand: 'artiste,scene'
    })
  } catch (error) {
    logPocketBaseError('getAllArtistesSortedByDate', error)
    return []
  }

  return representations.map((rep) => ({
    id_representation: rep.id,
    date_debut: rep.date_debut,
    date_fin: rep.date_fin,
    artiste: rep.expand?.artiste || null,
    scene: rep.expand?.scene || null
  }))
}

export async function getAllScenesSortedByName() {
  try {
    return await pb.collection('scenes').getFullList({
      sort: 'nom'
    })
  } catch (error) {
    logPocketBaseError('getAllScenesSortedByName', error)
    return []
  }
}
export async function getAllArtistesSortedAlphabetically() {
  try {
    return await pb.collection('artistes').getFullList({
      sort: 'nom'
    })
  } catch (error) {
    logPocketBaseError('getAllArtistesSortedAlphabetically', error)
    return []
  }
}
export async function getArtisteById(id) {
  let artiste

  try {
    artiste = await pb.collection('artistes').getOne(id)
  } catch (error) {
    logPocketBaseError('getArtisteById.getOne', error)
    return null
  }

  let representations = []
  try {
    representations = await pb.collection('representations').getFullList({
      filter: `artiste = "${id}"`,
      sort: 'date_debut',
      expand: 'scene'
    })
  } catch (error) {
    logPocketBaseError('getArtisteById.getRepresentations', error)
  }

  return {
    ...artiste,
    representations
  }
}

export async function getSceneById(id) {
  let scene

  try {
    scene = await pb.collection('scenes').getOne(id)
  } catch (error) {
    logPocketBaseError('getSceneById.getOne', error)
    return null
  }

  let representations = []
  try {
    representations = await pb.collection('representations').getFullList({
      filter: `scene = "${id}"`,
      sort: 'date_debut',
      expand: 'artiste'
    })
  } catch (error) {
    logPocketBaseError('getSceneById.getRepresentations', error)
  }

  return {
    ...scene,
    representations
  }
}

export async function getArtistesBySceneId(id) {
  let representations = []
  try {
    representations = await pb.collection('representations').getFullList({
      filter: `scene = "${id}"`,
      sort: 'date_debut',
      expand: 'artiste,scene'
    })
  } catch (error) {
    logPocketBaseError('getArtistesBySceneId', error)
    return []
  }

  return representations.map((rep) => ({
    id_representation: rep.id,
    date_debut: rep.date_debut,
    date_fin: rep.date_fin,
    artiste: rep.expand?.artiste || null,
    scene: rep.expand?.scene || null
  }))
}

export async function getArtistesBySceneName(nomScene) {
  let result

  try {
    result = await pb.collection('scenes').getList(1, 1, {
      filter: `nom = "${nomScene}"`
    })
  } catch (error) {
    logPocketBaseError('getArtistesBySceneName.getScene', error)
    return []
  }

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
    try {
      return await pb.collection(collectionName).update(id, data)
    } catch (error) {
      logPocketBaseError('saveItem.update', error)
      throw error
    }
  }
  try {
    return await pb.collection(collectionName).create(data)
  } catch (error) {
    logPocketBaseError('saveItem.create', error)
    throw error
  }
}

export default pb