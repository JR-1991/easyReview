from typing import Any, Dict, List

from rest_framework import status
from rest_framework.response import Response

import requests
from reviews.models import Review


def fetch_open_metadatablock_fields_for_review(review_pk: str) -> Dict[str, Any]:
    review = Review.objects.filter(id=review_pk).first()

    if review is None:
        return Response(
            {"message": f"Review with ID '{review_pk}' does not exist."},
            status=status.HTTP_404_NOT_FOUND,
        )

    site_url = review.site_url

    if site_url.endswith("/"):
        site_url = site_url[:-1]

    url = "{site_url}/api/metadatablocks/{metadatablock_id}"

    return Response(
        data=[
            _fetch_open_metadatablock_fields(
                metadatablock,
                url.format(site_url=site_url, metadatablock_id=metadatablock.name),
            )
            for metadatablock in review.metadatablocks.all()
        ],
        status=status.HTTP_200_OK,
    )


def _fetch_open_metadatablock_fields(metadatablock, url: str) -> Dict[str, Any]:
    response = requests.get(url)
    response.raise_for_status()

    fields = response.json()["data"]["fields"]

    return {
        "name": metadatablock.name,
        "primitives": _retrieve_primitives(fields, metadatablock),
        "compounds": _retrieve_compounds(fields, metadatablock),
    }


def _get_child_field_names(fields: Dict) -> List[str]:
    return [
        child_field["name"]
        for field in fields.values()
        for child_field in field.get("childFields", {}).values()
    ]


def _retrieve_primitives(fields: Dict, metadatablock) -> List[Dict]:
    child_field_names = _get_child_field_names(fields)
    return [
        field["name"]
        for field in fields.values()
        if field["name"] not in child_field_names
        and "childFields" not in field
        and _to_extract(field, metadatablock.primitives.all())
    ]


def _retrieve_compounds(fields: Dict, metadatablock) -> List[Dict]:
    return [
        field["name"]
        for field in fields.values()
        if "childFields" in field and _to_extract(field, metadatablock.compounds.all())
    ]


def _in_review(name: str, fields) -> bool:
    return any(field.name == name for field in fields)


def _to_extract(field: Dict, fields) -> bool:
    if field["multiple"] is True:
        return True

    return not _in_review(field["name"], fields)
