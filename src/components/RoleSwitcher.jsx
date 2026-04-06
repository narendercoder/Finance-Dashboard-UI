import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";
export function RoleSwitcher() {
  const {
    state,
    dispatch
  } = useAppContext();
  return <Select value={state.role} onValueChange={val => dispatch({
    type: "SET_ROLE",
    payload: val
  })}>
      <SelectTrigger className="w-[120px] h-8" data-testid="select-role">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="viewer">Viewer</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>;
}