
function EntriesPerPageSelector({ pageLimit, onPageLimitChange }) {
    // const langCode = useLangCode();
    // const translations = useTranslation(langCode, "entriesPerpage");
    return (
      <div className="datatable-dropdown mob-donw ms-2">
        <label>
          <select
            className="datatable-selector"
            value={pageLimit}
            onChange={(e) => onPageLimitChange(Number(e.target.value))}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={150}>150</option>
            <option value={200}>200</option>
          </select>
        </label>
      </div>
    );
  }
  
  export default EntriesPerPageSelector;
  