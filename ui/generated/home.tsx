import { Badge, Card, Grid, Heading, Image, Link, Page, Row, Section, Stack, Text } from "@/components/ui"

function ServiceCard({ number, title, description }: any) {
  return (
    <Card>
      <Text>{number}</Text>
      <Heading level={3}>{title}</Heading>
      <Text>{description}</Text>
      <Link href="services.html">Explore service</Link>
    </Card>
  )
}

function WorkCard({ category, title, description }: any) {
  return (
    <Card>
      <Badge>{category}</Badge>
      <Heading level={3}>{title}</Heading>
      <Text>{description}</Text>
    </Card>
  )
}

function InsightCard({ type, title, href }: any) {
  return (
    <Card>
      <Badge>{type}</Badge>
      <Heading level={3}>{title}</Heading>
      <Link href={href}>Read insight</Link>
    </Card>
  )
}

function DirectionalRobot({ asset }: any) {
  return (
    <Card>
      <Image src={asset} alt="Futuristic robot directional sprite atlas" />
      <Badge>9 high-resolution gaze poses · mouse or touch</Badge>
    </Card>
  )
}

export function FahimPortfolio({ data, onAction }: { data: any; onAction: (name: string) => void }) {
  return (
    <Page>
      <Stack gap="lg">
        <Section>
          <Badge>AI strategist · agent architect · London</Badge>
          <Heading level={1}>Intelligence with intent.</Heading>
          <Text>I architect AI products, agent systems, and intelligent workflows that turn frontier capability into trusted, measurable advantage.</Text>
          <Row gap="md">
            <Link href="#work">Explore selected work</Link>
            <Link href="services.html">See how I can help</Link>
          </Row>
          <DirectionalRobot asset="assets/futuristic-robot-atlas-hd.webp" />
        </Section>
        <Section>
          <Heading level={2}>From possibility to practice.</Heading>
          <Grid columns={2} gap="md">
            <ServiceCard number="01" title="AI opportunity & strategy" description="Find where AI creates genuine leverage and leave with a roadmap leaders can act on." />
            <ServiceCard number="02" title="Agentic product design" description="Design copilots and multi-agent workflows around control, context, and quality." />
            <ServiceCard number="03" title="Prototype to production" description="Turn a valuable hypothesis into a testable, trustworthy system." />
            <ServiceCard number="04" title="AI enablement" description="Give teams the literacy, workflows, and playbooks to adopt AI confidently." />
          </Grid>
        </Section>
        <Section>
          <Heading level={2}>Systems with consequence.</Heading>
          <Grid columns={2} gap="md">
            <WorkCard category="Knowledge systems" title="From buried expertise to a decision engine." description="A grounded assistant that makes provenance and shared context visible." />
            <WorkCard category="Customer experience" title="Less friction. More confident action." description="An AI service layer that recognises intent and knows when humans should take over." />
          </Grid>
        </Section>
        <Section>
          <Heading level={2}>Ideas for useful AI.</Heading>
          <Grid columns={3} gap="md">
            <InsightCard type="Tool review" title="FreeBuff proves free AI coding can have serious architecture" href="article-freebuff.html" />
            <InsightCard type="Perspective" title="The quiet power of making AI less impressive" href="article-less-impressive.html" />
            <InsightCard type="Field notes" title="Copilots are a design problem before a tech problem" href="article-copilots.html" />
          </Grid>
        </Section>
      </Stack>
    </Page>
  )
}
