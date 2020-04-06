export default function createActionTypes(actionType) {
  const SUCCESS = `${actionType}_SUCCESS`;
  const FAILURE = `${actionType}_FAILURE`;
  return [actionType, SUCCESS, FAILURE];
}
