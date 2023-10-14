import React, { useState, useEffect } from "react";
import Modal from "./modal";
import { getBallotData } from "@/apis/ballots";
import { Candidate } from "@/apis/types";

export default function CandidatesModal({ setIsModal, ballotId }: any) {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        getBallotData(ballotId, 'candidates').then((data) => {
            setCandidates(data);
            console.log(data);
        })
    }, [ballotId])

    const renderContent = () => {
        
    }

    return (
        <Modal
            modalMode={0}
            title={`어느 후보에게 투표하시겠습니까?`}
            setModalState={setIsModal}
            onClickCompleteButton={() => setIsModal(false)}
            completeText=''
        >
            <div className='p-5'>
                {renderContent()}
            </div>
        </Modal>
    )
}