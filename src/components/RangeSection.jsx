export default function RangeSection({ skills, skillsRef, startAnimation, percentages }) {
    return (
        <div ref={skillsRef} className="space-y-10">
            {skills.map((skill, idx) => (
                <div key={idx}>
                    <div className="w-full bg-gray-100 border border-gray-300 h-25 rounded-3xl">
                        {/* Fill Bar */}
                        <div
                            className={` bg-blue-950 py-2 px-5 h-25 flex items-center justify-between rounded-3xl`}
                            style={{
                                width: startAnimation ? `${skill.percent}%` : 0,
                                transition: `width 1.5s ease ${idx * 0.3}s`,
                            }}
                        >
                            {startAnimation && percentages[idx] > 43 && (
                                <div className="flex flex-col items-start">
                                    <h6
                                        className="text-lg lg:text-xl font-light text-yellow-500 opacity-0"
                                        style={{
                                            transition: `opacity 0.5s ease ${idx * 0.3 + 0.5}s`,
                                            opacity: 1,
                                        }}
                                    >
                                        {skill.title}
                                    </h6>
                                    <p
                                        className="text-sm lg:text-xl font-light text-white opacity-0"
                                        style={{
                                            transition: `opacity 0.5s ease ${idx * 0.3 + 0.5}s`,
                                            opacity: 1,
                                        }}
                                    >
                                        {skill.description}
                                    </p>

                                </div>
                            )}
                            <span
                                className="text-2xl font-bold opacity-0"
                                style={{
                                    transition: `opacity 0.5s ease ${idx * 0.3 + 0.5}s`,
                                    opacity: 1,
                                }}
                            >
                                {percentages[idx]}%
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}