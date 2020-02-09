interface ScosSubcattermDto {
  sterm: string;
}

export default interface ScosSubcategoryDto {
  subcategory: string;
  subcategoryid: string;
  subcatterm: ScosSubcattermDto[];
}
