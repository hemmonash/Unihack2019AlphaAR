using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class RaycastingModel : MonoBehaviour
{
    // Update is called once per frame
    void Update()
    {
        if(Input.touchCount == 1)
        {
            if(Input.GetTouch(0).phase == TouchPhase.Began)
            {
                if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit, Mathf.Infinity))
                {
                    Debug.Log(hit.transform.name);
                    
                }
            }
        }
    }
}
