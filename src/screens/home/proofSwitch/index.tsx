import { UpdateProofProps } from "@/modules/userDailyList/hooks"
import { proofType } from "@/utils/data"
import React from "react"
import { StyleSheet, View } from "react-native"
import Check from "./Check"
import Diary from "./Diary"
import Photo from "./Photo"
import Score from "./Score"

export interface ProofProps {
    userevent_id: string
    updateProof: (props: UpdateProofProps) => Promise<boolean>
    proof: number | null
    title: string
    diary?: string
    photo?: string
}

export interface ProofSwitchProps extends ProofProps {
    proof_type:proofType
    flex?: number
}

export default function ProofSwitch ({proof_type, flex, ...props}:ProofSwitchProps) {
    const {proofContainer} = styles;
    const style = flex ? [proofContainer, {flex}] : proofContainer;
    return(
        <View style={style}>
            { proof_type === "BOOLEAN" ?
                <Check {...props} />
            : proof_type === "SCORE" ?
                <Score {...props}/>
            : proof_type === "DIARY" ?
                <Diary {...props} />
            : proof_type === "PHOTO" ?
                <Photo {...props} />
            : <></>
            }
        </View>
    )
}

export const proofMessage = (proof_type:proofType):string[] => {
    const res = ['일정을 완료하셨나요? 완료 체크를 눌러주세요!', '완료한 일정입니다.'];
    switch (proof_type) {
        case "DIARY":
            res[0] = "오늘의 일정을 기록으로 남겨주세요!";
            res[1] = "기록이 작성되었습니다!";
            return res;
        case "PHOTO":
            res[0] = "일정을 완료하셨나요? 인증 사진을 올려보세요!";
            res[1] = "인증 사진이 업로드되었습니다.";
            return res;
        default:
            return res;
    }
}

const styles = StyleSheet.create({
    proofContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
})