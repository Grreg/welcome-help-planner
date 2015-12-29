<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;


class DefaultController extends Controller
{
    public function frontendAction(Request $request, $path)
    {
        if(strpos($path, 'assets/') === 0) {
            $assetPath = $this->get('kernel')->getRootDir() . '/../web/' . $path;

            $fs = new FileSystem();
            if (!$fs->exists($assetPath)) {
                throw $this->createNotFoundException();
            }
            else {
                $response = new BinaryFileResponse($assetPath);
                if((new File($assetPath))->getExtension() === 'html') {
                    $response->headers->set('Content-Type', 'text/html');
                }

                return $response;
            }
        }

        return $this->render('AppBundle:Default:index.html.twig');
    }

    public function organizationsAction()
    {
        $data = [
            ['id' => 1, 'name' => 'Dummy Organization One', 'slug' => 'dummy-one'],
            ['id' => 2, 'name' => 'Dummy Organization Two', 'slug' => 'dummy-two'],
        ];

        return new JsonResponse($data);
    }
}
