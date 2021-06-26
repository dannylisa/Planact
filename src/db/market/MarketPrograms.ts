import { IProgram } from '@/utils/data'

export const getMarketPrograms = async (): Promise<IProgram[]> => {
  return programs_dummy;
}

export const programs_dummy: IProgram[] = [
    {
      program_id: '1',
      publisher_id: '1111',
      program_name: '헬스 마니아의 근육 생성 프로젝트',
      description:
        '방학을 맞아 헬스를 시작하려는 여러분. 헬창 인생 10년차 이수영이 알려드립니다. 3주 근육 프로젝트',
      photoUrl: '../../assets/img/health.jpg',
      price: 3000,
    },
    {
      program_id: '2',
      publisher_id: '2222',
      program_name: '지뢰찾기 1위가 알려주는 지뢰찾기 마스터 플랜',
      description:
        '테스터훈 방송 출연, 역대 최단 기간 100만 조회수, 지뢰찾기 세계 1위가 알려주는 지뢰찾기 마스터 플랜',
      photoUrl: '../../assets/img/minesweeper.jpg',
      price: 3000,
    },
]
