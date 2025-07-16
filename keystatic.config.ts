import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          description: "A short description of the post for SEO",
          multiline: true,
        }),
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: { kind: "today" },
        }),
        featured: fields.checkbox({
          label: "Featured Post",
          defaultValue: false,
          description: "Feature this post on the homepage",
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "Trained Stoic",
        }),
        image: fields.image({
          label: "Cover Image",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
          description: "The main image for the blog post",
        }),
        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Tags",
            itemLabel: (props) => props.value,
          }
        ),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
        }),
      },
    }),
  },
  singletons: {
    home: singleton({
      label: "Home Page",
      path: "src/content/pages/home",
      schema: {
        hero: fields.object({
          title: fields.text({ label: "Hero Title" }),
          subtitle: fields.text({ 
            label: "Hero Subtitle",
            multiline: true,
          }),
          ctaText: fields.text({ 
            label: "CTA Button Text",
            defaultValue: "Read the Blog",
          }),
          ctaLink: fields.text({ 
            label: "CTA Button Link",
            defaultValue: "/blog",
          }),
        }),
        featuredPostsSection: fields.object({
          title: fields.text({ 
            label: "Section Title",
            defaultValue: "Featured Posts",
          }),
          description: fields.text({ 
            label: "Section Description",
            multiline: true,
          }),
        }),
      },
    }),
    about: singleton({
      label: "About Page",
      path: "src/content/pages/about",
      schema: {
        title: fields.text({ label: "Page Title" }),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public/images/pages",
              publicPath: "/images/pages/",
            },
          },
        }),
      },
    }),
    settings: singleton({
      label: "Site Settings",
      path: "src/content/settings",
      schema: {
        siteName: fields.text({ 
          label: "Site Name",
          defaultValue: "Trained Stoic",
        }),
        siteDescription: fields.text({ 
          label: "Site Description",
          multiline: true,
          description: "Used for SEO",
        }),
        siteUrl: fields.text({ 
          label: "Site URL",
          defaultValue: "https://trainedstoic.com",
          description: "The production URL of your site",
        }),
        social: fields.object({
          twitter: fields.text({ label: "Twitter Handle" }),
          linkedin: fields.text({ label: "LinkedIn URL" }),
          github: fields.text({ label: "GitHub URL" }),
        }),
        analytics: fields.object({
          userMavenId: fields.text({ 
            label: "UserMaven ID",
            description: "Your UserMaven tracking ID",
          }),
          googleAnalyticsId: fields.text({ 
            label: "Google Analytics ID (Legacy)",
            description: "UA-XXXXXXXXX-X or G-XXXXXXXXXX - Use UserMaven instead",
          }),
        }),
      },
    }),
  },
});