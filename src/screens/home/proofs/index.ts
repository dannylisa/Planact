import { UpdateProofProps } from "@/modules/userDailyList/hooks"

export interface ProofProps {
    userevent_id: string
    updateProof: (props: UpdateProofProps) => Promise<boolean>
    proof: number | null
    title: string
    diary?: string
    photo?: string
}
export {default as Check} from "./Check"
export {default as Score} from "./Score"
export {default as Diary} from "./Diary"
export {default as Photo} from "./Photo"