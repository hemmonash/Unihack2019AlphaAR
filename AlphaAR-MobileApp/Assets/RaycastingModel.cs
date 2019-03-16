using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class RaycastingModel : MonoBehaviour
{

    private bool animRunning = false;

    // Update is called once per frame
    void Update()
    {
        Debug.DrawLine(transform.position, transform.forward, Color.green);
        if(Input.touchCount == 1 && !animRunning)
        {
            if(Input.GetTouch(0).phase == TouchPhase.Began)
            {
                if (Physics.Raycast(transform.position, transform.forward, out RaycastHit hit, Mathf.Infinity))
                {
                    Debug.Log(hit.transform.name);
                    string animName = hit.transform.name;
                    var hitParent = hit.transform.parent.GetComponent<Animator>();
                    try
                    {
                        StartCoroutine(PlayAnim(hitParent, animName));
                    }
                    catch
                    {
                        return;
                    }
                }
            }
        }
    }

    private IEnumerator PlayAnim(Animator obj, string animName)
    {
        obj.Play(animName, -1, 0);

        animRunning = true;
        float counter = 0;
        float waitTime = obj.GetCurrentAnimatorStateInfo(0).length;
        while(counter < waitTime)
        {
            counter += Time.deltaTime;
            yield return null;
        }
        animRunning = false;
    }
}
