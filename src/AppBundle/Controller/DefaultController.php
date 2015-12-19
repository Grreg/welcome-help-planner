<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    public function homepageAction(Request $request)
    {
        $organisations = $this->getDoctrine()
            ->getRepository('AppBundle:Organisation')
            ->findAll();

        // var_dump($organisations);

        return $this->render('AppBundle:Default:index.html.twig', [
            'organisations' => $organisations,
        ]);
    }
}
