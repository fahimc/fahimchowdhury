import { Badge, Card, Grid, Heading, Link, Page, Section, Stack, Text } from "@/components/ui"

function ArticleCard({ type, title, summary, href }: any) {
  return (
    <Card>
      <Badge>{type}</Badge>
      <Heading level={2}>{title}</Heading>
      <Text>{summary}</Text>
      <Link href={href}>Read article</Link>
    </Card>
  )
}

export function FahimBlog({ data, onAction }: { data: any; onAction: (name: string) => void }) {
  return (
    <Page>
      <Stack gap="lg">
        <Section>
          <Badge>Notes from the edge of useful</Badge>
          <Heading level={1}>Insights</Heading>
          <Text>Ideas about AI, product, and the choices that make new technology feel human.</Text>
        </Section>
        <Section><ArticleCard type="Tool review · 12 min" title="FreeBuff proves free AI coding can have serious architecture" summary="Inside the orchestration and economics of a zero-dollar coding agent." href="article-freebuff.html" /></Section>
        <Section>
          <Grid columns={3} gap="md">
            <ArticleCard type="Perspective · 6 min" title="The quiet power of making AI less impressive" summary="Why useful intelligence often feels quiet." href="article-less-impressive.html" />
            <ArticleCard type="Field notes · 8 min" title="Copilots are a design problem before a tech problem" summary="A framework for assistance people can trust." href="article-copilots.html" />
            <ArticleCard type="Playbook · 5 min" title="Ask what to make possible" summary="Three prompts for a sharper AI conversation." href="article-possibility.html" />
          </Grid>
        </Section>
      </Stack>
    </Page>
  )
}
