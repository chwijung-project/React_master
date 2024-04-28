import React from 'react';
import { useSelector } from 'react-redux';

const PostingPgn = () => {
    const pageInfo = useSelector(state => state.postReducer.pageInfo);
    console.log("pageInfo",pageInfo)

    return (
        <div>
            {/* {pageInfo.prev && <button>이전</button>} */}
            {Array.from({ length: (pageInfo.pageEnd - pageInfo.pageStart + 1) }, (_, i) => (
                <button key={i}>
                    {pageInfo.pageStart + i}
                </button>
            ))}
            {/* {pageInfo.next && <button>다음</button>} */}
        </div>
    );
};

export default PostingPgn;