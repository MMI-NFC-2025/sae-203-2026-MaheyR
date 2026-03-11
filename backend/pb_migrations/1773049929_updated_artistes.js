/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3183463462")

  // remove field
  collection.fields.removeById("url3780381041")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3183463462")

  // add field
  collection.fields.addAt(6, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url3780381041",
    "name": "site_web",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  return app.save(collection)
})
