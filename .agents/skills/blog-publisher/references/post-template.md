# Post Template

New posts are added directly to `src/data/blogPosts.tsx`.

Use this structure:

```tsx
{
  id: 35,
  title: "TITLE HERE",
  excerpt: "EXCERPT HERE",
  category: "Social Commerce",
  author: rodAuthor,
  date: "Apr 9, 2026",
  dateISO: "2026-04-09T08:00:00Z",
  readTime: "6 min read",
  image: "/blog/your-image-slug.png",
  tags: ['Tag One', 'Tag Two', 'Tag Three'],
  content: (
    <>
      <p className="text-xl leading-relaxed mb-8 text-gray-600 font-medium">
        Strong opening paragraph.
      </p>
      <p className="text-lg leading-relaxed mb-8">
        Body paragraph with a <ContentLink href="https://example.com">clean source link</ContentLink>.
      </p>
      <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">Section heading</h2>
      <p className="text-lg leading-relaxed mb-8">
        More body copy.
      </p>
      <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">This is what we're building at GrowthSync</h2>
      <p className="text-lg leading-relaxed mb-8">
        Tie the article back to the product and add a <ContentLink href="/demo">demo link</ContentLink>.
      </p>
      <h2 className="text-3xl font-display font-bold text-gray-950 mt-16 mb-6">Sources</h2>
      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 mb-8">
        <p className="text-base leading-relaxed text-gray-600 mb-3">
          <ContentLink href="https://example.com">Source title</ContentLink>
        </p>
        <p className="text-base leading-relaxed text-gray-600">
          <ContentLink href="/blog/6">Related: Internal article title</ContentLink>
        </p>
      </div>
    </>
  )
}
```

## Editing Notes

- Keep `ContentLink` for both external and internal links.
- Put the newest post at the top of the array.
- Keep classes identical unless there is a real design reason to change them.
- Match `date` and `dateISO`.
- Use the next available numeric `id`.
