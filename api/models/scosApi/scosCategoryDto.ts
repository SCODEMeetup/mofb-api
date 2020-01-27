import ScosSubcategoryDto from "./scosSubcategoryDto";

export default interface ScosCategoryDto {
  category: string;
  categoryid: string;
  subcat: ScosSubcategoryDto[];
}