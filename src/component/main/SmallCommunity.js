import './SmallCommunity.css';

function SmallCommunity() {
    const roles = [
        { name: '머신러닝/딥러닝 엔지니어', class: 'mle' },
        { name: '머신러닝/딥러닝 리서처', class: 'mls' },
        { name: '데이터 사이언티스트', class: 'ds' },
        { name: '데이터 엔지니어', class: 'de' },
        { name: 'AI 서비스 개발자', class: 'ai_dev' },
        { name: 'AI 서비스 기획자', class: 'ai_pm' },
        { name: 'AI 아티스트', class: 'ai_art' },
        { name: '', class: '' }
    ];

return (
<div className = 'smallpost_container'>
    <div className="smallpost_first">
        <div className="smallpost_left">
            <div className="smallpost_title">
                직무 오픈채팅
            </div>
        </div>
    </div>
    <div className="smallpost_second">
        <div className="smallpost_box">
            <div className="smallcommu_contents">
                {roles.map(role => (
                    <div key={role.name}>
                    {role.name &&(
                    <>
                    <span className={`smallcommu_contents_logo ${role.class}`}>
                        <span className="smallcommu_contents_left">
                            chat
                        </span>
                    </span>
                    <span className="smallcommu_contents_right">
                        {role.name}
                    </span>
                    <span className="smallcommu_openchat">
                        <button>오픈채팅</button>
                    </span>
                    </>
                    )}
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>
);
};

export default SmallCommunity;