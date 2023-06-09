import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(request: FastifyRequest, replay: FastifyReply) {
  const historyCkeckInsBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = historyCkeckInsBodySchema.parse(request.query)

  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  })
  return replay.status(200).send({
    checkIns,
  })
}
