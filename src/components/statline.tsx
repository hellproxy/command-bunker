interface StatLineProps {
  data: Immutable.StatLine;
}

export const StatLine = ({
  data: {
    movement,
    toughness,
    armourSave,
    invulnerableSave,
    wounds,
    leadership,
    objectiveControl,
  },
}: StatLineProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex statline">
        <div>
          <div>M</div>
          <div className="statsline-box">{`${movement}"`}</div>
        </div>
        <div>
          <div>T</div>
          <div className="statsline-box">{toughness}</div>
        </div>
        <div>
          <div>SV</div>
          <div className="statsline-box">{`${armourSave}+`}</div>
        </div>
        <div>
          <div>IN</div>
          <div className="statsline-box">
            {invulnerableSave ? `${invulnerableSave}+` : ""}
          </div>
        </div>
        <div>
          <div>W</div>
          <div className="statsline-box">{wounds}</div>
        </div>
        <div>
          <div>LD</div>
          <div className="statsline-box">{`${leadership}+`}</div>
        </div>
        <div className="mr-0">
          <div>OC</div>
          <div className="statsline-box">{objectiveControl}</div>
        </div>
      </div>
    </div>
  );
};
