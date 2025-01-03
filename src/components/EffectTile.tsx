import { colors } from "../constants/theme";

interface EffectTileProps {
  title: string;
  onClick: () => void;
}

export default function EffectTile({ title, onClick }: EffectTileProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: colors.primaryLight,
        padding: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        width: "100%",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv69-TPxuaykcT38rMUIwPlSNgR3Ye7l1KXA&s"
          }
          alt="Tile Icon"
          style={{
            width: "30%",
            height: "auto",
            backgroundColor: colors.primary,
            borderRadius: "5px",
            marginRight: "10px",
          }}
        /> */}
        <div
          style={{
            width: "100px",
            height: "60px",
            backgroundColor: colors.primary,
            borderRadius: "5px",
            marginRight: "10px",
          }}
        ></div>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            color: colors.textPrimary,
            flex: 1,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
