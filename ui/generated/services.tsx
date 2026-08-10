import { Badge, Card, Heading, Link, Page, Section, Stack, Text } from "@/components/ui"

function ServiceDetail({ number, title, summary, output }: any) {
  return (
    <Card>
      <Text>{number}</Text>
      <Heading level={2}>{title}</Heading>
      <Text>{summary}</Text>
      <Badge>{output}</Badge>
    </Card>
  )
}

export function FahimServices({ data, onAction }: { data: any; onAction: (name: string) => void }) {
  return (
    <Page>
      <Stack gap="lg">
        <Section>
          <Badge>AI services · strategy to scale</Badge>
          <Heading level={1}>Make AI useful.</Heading>
          <Text>Focused advisory and delivery for organisations that want AI to change an outcome.</Text>
          <Link href="mailto:hello@fahimchowdhury.com">Discuss a brief</Link>
        </Section>
        <Section>
          <ServiceDetail number="01" title="AI opportunity & strategy" summary="Connect business priorities, user friction, data reality, and organisational readiness." output="Roadmap + operating model" />
          <ServiceDetail number="02" title="Agentic product design" summary="Define agent roles, context, tools, controls, and evidence around a useful experience." output="Product + agent architecture" />
          <ServiceDetail number="03" title="Prototype to production" summary="Build enough of the real system to learn, evaluate, integrate, and launch confidently." output="Working system + launch plan" />
          <ServiceDetail number="04" title="AI enablement" summary="Create practical fluency and repeatable AI working patterns around real workflows." output="Workshops + playbooks" />
        </Section>
      </Stack>
    </Page>
  )
}
