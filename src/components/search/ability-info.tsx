import { FlaskRound, Sparkles } from "lucide-react";
import { Tags } from "../tags";

interface AbilityInfoProps {
  ability: Immutable.Ability;
  unitName: string;
}

export const AbilityInfo = ({ ability, unitName }: AbilityInfoProps) => {
  const { name, description, tags, subAbilities } = ability;
  const isWargear = ability.optional;

  return (
    <div className="flex flex-col px-4 py-4 gap-3 bg-white rounded-lg shadow-md text-sm">
      <div className="flex flex-row gap-2 items-stretch">
        <div className="flex items-center">
          {isWargear ? <FlaskRound size={18} /> : <Sparkles size={18} />}
        </div>
        <div className="flex flex-row items-baseline grow">
          <div className="text-lg">{name}</div>
          <div className="text-gray-400 grow text-right">{unitName}</div>
        </div>
      </div>
      <div className="text-justify">{description}</div>
      {subAbilities && (
        <div className="flex flex-col ml-4 gap-2">
          {subAbilities.map((sub, index) => (
            <div key={index}>
              <div>
                <b>{sub.name}</b>
              </div>
              <div className="text-justify">{sub.description}</div>
            </div>
          ))}
        </div>
      )}
      {tags && <Tags tags={tags} />}
    </div>
  );
};
