import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, replay: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCounts } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })
  return replay.status(200).send({
    checkInsCounts,
  })
}
