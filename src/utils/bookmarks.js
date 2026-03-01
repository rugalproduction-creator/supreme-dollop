export const STORAGE_KEY = 'rp_bookmarks'
function normalizeComic(raw){
  if (!raw) return null
  const comic = raw.comic ?? raw

  // common field mappings
  const id = raw.id ?? comic.id ?? comic._id ?? comic.slug ?? comic.name ?? comic.title ?? JSON.stringify(comic)
  const name = comic.name ?? comic.title ?? comic.heading ?? 'Untitled'
  const cover = comic.cover ?? comic.thumbnail ?? comic.image ?? comic.cover_url ?? '/jjk.jpg'
  const author = comic.author ?? comic.creator ?? comic.authors ?? 'Unknown'
  const views = Number(comic.views ?? comic.viewCount ?? comic.views_count ?? 0) || 0
  const likes = Number(comic.likes ?? comic.likeCount ?? comic.likes_count ?? 0) || 0
  const episodes = Number(comic.episodes ?? comic.chapters ?? comic.count ?? 0) || 0
  const rating = Number(comic.rating ?? comic.score ?? 0) || 0
  const updatedAt = comic.updatedAt ?? comic.updated_at ?? comic.modified ?? comic.updated ?? comic.published ?? ''

  return { id, cover, name, author, views, likes, episodes, rating, updatedAt }
}

function loadRaw(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)

    // If it's an array, normalize each entry into {id, comic, group}
    if (Array.isArray(parsed)) {
      return parsed.map(item => {
        const group = item.group || 'Saved'
        const comic = normalizeComic(item)
        const id = item.id ?? (comic && comic.id)
        return { id, comic, group }
      }).filter(Boolean)
    }

    // Normalize older/grouped formats: { groupName: [items] }
    if (parsed && typeof parsed === 'object') {
      // If it already looks like a single bookmark object, normalize it and return in array
      if (parsed.id && (parsed.comic || parsed.name)) return [{ id: parsed.id, comic: normalizeComic(parsed), group: parsed.group || 'Saved' }]

      const flattened = []
      for (const key of Object.keys(parsed)) {
        const val = parsed[key]
        if (Array.isArray(val)) {
          val.forEach(item => {
            if (!item) return
            const group = item.group || key
            const comic = normalizeComic(item)
            const id = item.id ?? (comic && comic.id) ?? `${key}:${flattened.length}`
            flattened.push({ id, comic, group })
          })
        } else if (val && (val.id || val.comic || val.name)) {
          const item = val
          const group = item.group || key
          const comic = normalizeComic(item)
          const id = item.id ?? (comic && comic.id) ?? key
          flattened.push({ id, comic, group })
        }
      }
      return flattened
    }

    return []
  }catch(e){
    console.error('Failed to parse bookmarks', e)
    return []
  }
}

function saveRaw(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function getBookmarks(){
  return loadRaw()
}

export function getGroups(){
  const list = loadRaw()
  const groups = {}
  list.forEach(item => {
    let entry = item
    // normalize entry to { id, comic, group }
    if (!entry) return
    if (!entry.comic) {
      // if item already has comic-like fields, wrap it
      if (entry.name || entry.cover || entry.author) {
        const id = entry.id ?? entry.name ?? JSON.stringify(entry)
        entry = { id, comic: item, group: item.group || 'Saved' }
      } else if (entry.comic) {
        entry.group = entry.group || 'Saved'
      } else {
        // unknown shape, skip
        return
      }
    } else {
      entry.group = entry.group || 'Saved'
    }

    const g = entry.group || 'Saved'
    groups[g] = groups[g] || []
    groups[g].push(entry)
  })
  return groups
}

export function isBookmarked(id){
  const list = loadRaw()
  return list.some(i => i.id === id)
}

export function saveBookmark(comic, group = 'Saved'){
  const id = comic.id ?? comic.name
  const list = loadRaw()
  if (list.some(i => i.id === id)) return
  list.push({ id, comic, group })
  saveRaw(list)
}

export function removeBookmark(id){
  const list = loadRaw().filter(i => i.id !== id)
  saveRaw(list)
}

export function moveBookmark(id, newGroup){
  const list = loadRaw()
  const idx = list.findIndex(i => i.id === id)
  if (idx === -1) return
  list[idx].group = newGroup
  saveRaw(list)
}

export function createGroup(name){
  // groups are implicit by bookmark.group; no-op here but keep API
  return name
}
