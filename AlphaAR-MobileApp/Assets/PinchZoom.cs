using UnityEngine;

public class PinchZoom : MonoBehaviour
{
    [SerializeField] private Transform obj;
    [SerializeField] private float persZoomSpeed = .5f;

    public void AssignModel(Transform newObj)
    {
        obj = newObj;
    }

    private void Update()
    {
        if(Input.touchCount == 2 && obj != null)
        {
            Touch touch1 = Input.GetTouch(0);
            Touch touch2 = Input.GetTouch(1);

            Vector2 prevPos1 = touch1.position - touch1.deltaPosition;
            Vector2 prevPos2 = touch2.position - touch2.deltaPosition;

            float prevDeltaMag = (prevPos1 - prevPos2).magnitude;
            float deltaMag = (touch1.position - touch2.position).magnitude;

            float deltaMagDiff = prevDeltaMag - deltaMag;

            obj.localScale += Vector3.one * deltaMagDiff * persZoomSpeed * Time.deltaTime;
            obj.localScale = new Vector3(Mathf.Clamp(obj.localScale.x, 0.01f, 0.1f), Mathf.Clamp(obj.localScale.y, 0.01f, 0.1f), Mathf.Clamp(obj.localScale.z, 0.01f, 0.1f));
        }
    }
}
