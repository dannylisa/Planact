import { IPlanGroup, IplanItem } from '@/utils/data'

export const getPlanGroup = async (user_id: string): Promise<IPlanGroup> => {
  return plan_sample
}

export const plan_sample: IPlanGroup = {
  plans: [
    {
      id: '1',
      summary: '헬스 마니아의 근육 생성 프로젝트',
      description:
        '방학을 맞아 헬스를 시작하려는 여러분. 헬창 인생 10년차 이수영이 알려드립니다. 3주 근육 프로젝트',
      photoUrl: '../../assets/img/health.jpg',
      price: 3000,
    },
    {
      id: '2',
      summary: '지뢰찾기 1위가 알려주는 지뢰찾기 마스터 플랜',
      description:
        '테스터훈 방송 출연, 역대 최단 기간 100만 조회수, 지뢰찾기 세계 1위가 알려주는 지뢰찾기 마스터 플랜',
      photoUrl: '../../assets/img/minesweeper.jpg',
      price: 3000,
    },
    {
      id: '3',
      summary: '탁구 천재 이수영의 탁구 마스터 플랜',
      description:
        '중학교 유망주 이수영. 비록 국가대표에선 떨어졌지만 제자 양성 중. 국가대표에 도전하세요',
      photoUrl: '../../assets/img/tabletennis.jpg',
      price: 3000,
    },
  ],
}
