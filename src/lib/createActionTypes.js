export default function createActionTypes(actionType) {
  const REQUEST = `${actionType}_REQUEST`;
  const SUCCESS = `${actionType}_SUCCESS`;
  const FAILURE = `${actionType}_FAILURE`;
  return { REQUEST, SUCCESS, FAILURE };
}
