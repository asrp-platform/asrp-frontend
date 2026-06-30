import { ImageResponse } from "next/og"

// eslint-disable-next-line react-refresh/only-export-components
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = "image/png"

const OpenGraphImage = () => {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                background: "#f8fafc",
                color: "#1f2933",
                fontFamily: "Arial, Helvetica, sans-serif",
                padding: "72px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    border: "3px solid #8f1d2c",
                    borderRadius: "32px",
                    padding: "56px",
                    background: "#ffffff",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
                    <div
                        style={{
                            width: "96px",
                            height: "96px",
                            borderRadius: "24px",
                            background: "#8f1d2c",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "42px",
                            fontWeight: 700,
                        }}
                    >
                        A
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ fontSize: "34px", fontWeight: 700 }}>ASRP</div>
                        <div style={{ fontSize: "22px", color: "#52616f" }}>
                            American Society of Russian-Speaking Pathologists
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ fontSize: "58px", fontWeight: 750, lineHeight: 1.08 }}>
                        Education, mentorship, and community for pathologists
                    </div>
                    <div style={{ fontSize: "28px", color: "#52616f", lineHeight: 1.35 }}>
                        A professional nonprofit home for Russian-speaking pathologists and trainees
                        in the United States.
                    </div>
                </div>
            </div>
        </div>,
        size,
    )
}

export default OpenGraphImage
