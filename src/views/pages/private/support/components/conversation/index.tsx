import { Card } from '@views/components/ui/card'
import { CardBody } from '@views/pages/private/support/components/conversation/card-body'
import { CardFooter } from '@views/pages/private/support/components/conversation/card-footer'
import { CardHeader } from '@views/pages/private/support/components/conversation/card-header'

export function Conversation() {
  const messages = [
    {
      id: '8426117d-d8e6-4d10-b991-93e3f55b8473',
      role: 'assistant',
      content: 'Hi, how can I help you today?',
    },
    {
      id: 'b9fe64d5-faf0-415e-b11e-d73044ee7c6d',
      role: 'user',
      content: "I'm looking for information on renewable energy sources.",
    },
    {
      id: '6ef40de7-2b67-4d2a-a5c8-3dfa389cd21d',
      role: 'assistant',
      content:
        'Sure, renewable energy includes solar, wind, hydroelectric, and more. What exactly do you need?',
    },
    {
      id: 'e1d07ddc-dedd-4523-be23-2ff9bc8b8749',
      role: 'user',
      content: 'Can you tell me more about solar energy?',
    },
    {
      id: '5c3156d9-df95-46c0-8d5e-58283eecb8f1',
      role: 'assistant',
      content:
        "Solar energy is power from the sun's rays that is converted into electrical or thermal energy. It's sustainable and widely available.",
    },
    {
      id: '7a28c8d3-8db4-4605-b365-0b001bb8415c',
      role: 'user',
      content:
        "That's interesting! How effective is it compared to fossil fuels?",
    },
    {
      id: '2d408a62-320e-40e5-8b4a-a6492003f771',
      role: 'assistant',
      content:
        'Solar energy is increasingly cost-competitive with fossil fuels and has minimal environmental impacts. Its effectiveness varies by location and technology.',
    },
    {
      id: '16712c40-b57f-4a71-894e-b5a1ca3bb911',
      role: 'user',
      content:
        "Thanks for the information. I'll consider installing solar panels.",
    },
    {
      id: 'ef6bd105-f5dd-4f7b-904b-dbeeaa0835f7',
      role: 'assistant',
      content:
        "You're welcome! Feel free to ask if you have more questions about renewable energy.",
    },
    {
      id: '57fdde54-2a9a-484f-a680-ecb997daf43e',
      role: 'user',
      content: 'Will do, thanks again!',
    },
    {
      id: '16712c40-b57f-4a71-894e-b5a1ca3bb911',
      role: 'user',
      content:
        "Thanks for the information. I'll consider installing solar panels.",
    },
    {
      id: 'ef6bd105-f5dd-4f7b-904b-dbeeaa0835f7',
      role: 'assistant',
      content:
        "You're welcome! Feel free to ask if you have more questions about renewable energy.",
    },
    {
      id: '57fdde54-2a9a-484f-a680-ecb997daf43e',
      role: 'user',
      content: 'Will do, thanks again!',
    },
  ]

  return (
    <Card className="col-span-3 grid grid-rows-[min-content_1fr_min_content] overflow-hidden rounded-l-none rounded-r-xl shadow-none">
      <CardHeader />
      <CardBody messages={messages} />
      <CardFooter />
    </Card>
  )
}
